import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import { usersRouter } from '../../src/routes/users';
import express from 'express';
// import { pool } from '../../db/db';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/', usersRouter);

test('GET route works', (done) => {
  request(app)
    .get('/')
    .expect('Content-Type', /json/)
    // .expect({ name: 'frodo' })
    .expect(200, done);
});

// test('testing route works', (done) => {
//   request(app)
//     .post('/test')
//     .type('form')
//     .send({ item: 'hey' })
//     .then(() => {
//       request(app)
//         .get('/test')
//         .expect({ array: ['hey'] }, done);
//     });
// });
