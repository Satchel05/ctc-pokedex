import { auth } from '../lib/firebaseAdmin.js';
import { pool } from '../../db/db.js';

function requireRole(allowedRole) {
  return async (req, res, next) => {
    try {
      const uid = req.user.uid;

      const role = await pool.query(`SELECT role FROM users WHERE uid = $1;`, [
        uid,
      ]);

      const hasRole = role.rows[0]?.role === allowedRole;

      if (!hasRole) {
        throw new Error(
          `Role ${role.rows[0]?.role} Not Authorized. Requires ${allowedRole}`,
        );
      }

      req.user.role = role;

      next();
    } catch (err) {
      res.status(403).json({ err: err.message });
    }
  };
}

export { requireRole };
