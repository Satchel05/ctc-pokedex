import { auth } from '../src/lib/firebaseAdmin.ts';

const result = await auth.listUsers(1);
console.log('Connected to Firebase. result: ', result);
