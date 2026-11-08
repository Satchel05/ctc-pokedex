import express from 'express';
import { pool } from '../../db/db.js';

const pokemonRouter = express.Router();

// Returns every pokemon with its columns and related types, stats, and abilities (per the ERD).
// Related rows are aggregated in subqueries so the one-to-many joins don't multiply each other.
pokemonRouter.get('/', async (req, res) => {
  try {
    const data = await pool.query(
      `
      SELECT
        p.id,
        p.name,
        p.height,
        p.weight,
        p.base_experience,
        p.is_default,
        p.sprite_url,
        p.artwork_url,
        p.artwork_hq_url,
        p.created_at,
        COALESCE((
          SELECT json_agg(
            json_build_object('id', t.id, 'name', t.name, 'slot', pt.slot)
            ORDER BY pt.slot
          )
          FROM pokemon_types pt
          INNER JOIN types t ON t.id = pt.type_id
          WHERE pt.pokemon_id = p.id
        ), '[]') AS types,
        COALESCE((
          SELECT json_agg(
            json_build_object('id', s.id, 'name', s.name, 'base_stat', ps.base_stat, 'effort', ps.effort)
            ORDER BY s.id
          )
          FROM pokemon_stats ps
          INNER JOIN stats s ON s.id = ps.stat_id
          WHERE ps.pokemon_id = p.id
        ), '[]') AS stats,
        COALESCE((
          SELECT json_agg(
            json_build_object('id', a.id, 'name', a.name, 'is_hidden', pa.is_hidden, 'slot', pa.slot)
            ORDER BY pa.slot
          )
          FROM pokemon_abilities pa
          INNER JOIN abilities a ON a.id = pa.ability_id
          WHERE pa.pokemon_id = p.id
        ), '[]') AS abilities
      FROM pokemon p
      ORDER BY p.id;
      `,
    );
    res.status(200).json(data.rows);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

export { pokemonRouter };
