import express from 'express';
import { pool } from '../../db/db.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { PokemonParamsSchema } from '../../schemas/teams.js';
import { requireRole } from '../middleware/requireRole.js';

const teamsRouter = express.Router();

teamsRouter.get('/', verifyToken, requireRole('trainer'), async (req, res) => {
  try {
    const data = await pool.query(
      `
      SELECT
        p.id AS pokemon_id,
        p.name,
        p.sprite_url,
        p.artwork_url,
        p.artwork_hq_url,
        up.added_at,
        json_agg(
          json_build_object('name', s.name, 'base_stat', ps.base_stat)
          ORDER BY s.id
        ) AS stats,
        SUM(ps.base_stat)::int AS total
      FROM user_pokemon up
      INNER JOIN pokemon p ON p.id = up.pokemon_id
      INNER JOIN pokemon_stats ps ON ps.pokemon_id = p.id
      INNER JOIN stats s ON s.id = ps.stat_id
      WHERE up.user_uid = $1
      GROUP BY p.id, up.added_at
      ORDER BY up.added_at;
      `,
      [req.user.uid],
    );
    res.status(200).json(data.rows);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

teamsRouter.post(
  '/pokemon/:pokemon_id',
  verifyToken,
  requireRole('trainer'),
  async (req, res) => {
    try {
      const parsed = PokemonParamsSchema.safeParse(req.params);

      if (!parsed.success) {
        return res.status(400).json({
          error: 'Zod schema validation failed',
          details: parsed.error.issues,
        });
      }

      const { pokemon_id } = parsed.data;

      const pokemon = await pool.query(
        `SELECT id FROM pokemon WHERE id = $1;`,
        [pokemon_id],
      );

      if (pokemon.rows.length === 0) {
        return res.status(404).json({ error: 'Pokemon not found' });
      }

      const data = await pool.query(
        `
        INSERT INTO user_pokemon (user_uid, pokemon_id)
        VALUES ($1, $2)
        ON CONFLICT (user_uid, pokemon_id) DO NOTHING
        RETURNING *;
        `,
        [req.user.uid, pokemon_id],
      );

      if (data.rows.length === 0) {
        return res.status(409).json({ error: 'Pokemon already added' });
      }

      res.status(201).json(data.rows[0]);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },
);

teamsRouter.delete(
  '/pokemon/:pokemon_id',
  verifyToken,
  requireRole('trainer'),
  async (req, res) => {
    try {
      const parsed = PokemonParamsSchema.safeParse(req.params);

      if (!parsed.success) {
        return res.status(400).json({
          error: 'Zod schema validation failed',
          details: parsed.error.issues,
        });
      }

      const { pokemon_id } = parsed.data;

      const data = await pool.query(
        `
        DELETE FROM user_pokemon
        WHERE user_uid = $1 AND pokemon_id = $2
        RETURNING *;
        `,
        [req.user.uid, pokemon_id],
      );

      if (data.rows.length === 0) {
        return res.status(404).json({ error: 'Pokemon not found' });
      }

      res.status(204).end();
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },
);

export { teamsRouter };
