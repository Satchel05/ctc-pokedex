import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from '../db/db.js';
import { usersRouter } from './routes/users.js';
import { verifyToken } from './middleware/verifyToken.js';

dotenv.config({ path: new URL('../db/.env', import.meta.url) });

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  try {
    pool.connect().then(() => {
      res.json({ status: 'ok' });
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/api/me', verifyToken, (req, res) => {
  res.json({ identity: req.user.uid.uid });
});

app.use('/users', usersRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
