import { auth } from '../lib/firebaseAdmin.js';

async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'missing_token' });
    }

    const token = authHeader.slice(7);
    const uid = await auth.verifyIdToken(token);

    if (!uid) {
      throw new Error('Not Authorized');
    }

    req.user = { uid: uid };
    next();
  } catch (err) {
    res.status(401).json({ error: err });
  }
}

export { verifyToken };
