import { auth } from '../src/lib/firebaseAdmin.js';

const myToken = await auth.createCustomToken('123456789');

const res = await fetch(
  `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.FIREBASE_WEB_API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: myToken, returnSecureToken: true }),
  },
).catch((err) => {
  console.log(err);
});

const data = await res.json();

if (!res.ok) {
  console.log(res.status, data.error.errors[0]);
  process.exit(1);
}

console.log(data.idToken);
