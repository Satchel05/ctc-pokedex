import express from 'express';
import { pool } from '../../db/db.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { CreateUserSchema, UpdateUserSchema } from '../../schemas/users.js';
import { requireRole } from '../middleware/requireRole.js';

const usersRouter = express.Router();

usersRouter.get(
  '/',
  verifyToken,
  requireRole('spectator'),
  async (req, res) => {
    try {
      const data = await pool.query('SELECT * FROM users');
      res.status(200).send(data.rows);
    } catch (err) {
      res.status(400).json({ err: err });
    }
  },
);

// creates a user if uid is missing but does nothing if the uid does exist. Idempotent.
usersRouter.put('/me', verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const raw = CreateUserSchema.safeParse(req.body);

    if (!raw.success) {
      return res.status(400).json({
        error: 'Zod schema validation failed',
        details: raw.error.issues,
      });
    }

    const { name, email } = raw.data;

    await pool.query(
      `
      INSERT INTO Users (name, email, uid) values ($1, $2, $3)
      ON CONFLICT(uid) DO NOTHING;
      `,
      [name, email, uid],
    );

    const data = await pool.query(`SELECT * FROM users WHERE uid = $1;`, [uid]);

    res.status(200).send(data.rows);
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

usersRouter.patch('/me', verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const raw = UpdateUserSchema.safeParse(req.body);

    if (!raw.success) {
      return res.status(400).json({
        error: 'Zod schema validation failed',
        details: raw.error.issues,
      });
    }

    const { name, email } = raw.data;

    const data = await pool.query(
      `
    UPDATE Users 
    SET
      name = COALESCE($1, name),
      email = COALESCE($2, email),
      updated_at = now()
    WHERE uid = $3
    RETURNING *;
    `,
      [name, email, uid],
    );

    res.status(200).send(data.rows);
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

usersRouter.delete('/me', verifyToken, async (req, res) => {
  try {
    // added this line as cheap error logging
    if (!req.user?.uid.uid) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const uid = req.user.uid;

    const data = await pool.query(
      `
    DELETE FROM Users WHERE uid = $1
    RETURNING *;
    `,
      [uid],
    );

    res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
});

export { usersRouter };
