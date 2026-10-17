import dotenv from 'dotenv';
import { Pool } from 'pg'; // note that projects will likely use pg promise

dotenv.config({ path: new URL('./.env', import.meta.url) });

const {
  DB_ENVIRONMENT,
  DB_PORT,
  DEV_DB_HOST,
  DEV_DB_USER,
  DEV_DB_PASSWORD,
  DEV_DB_DATABASE,
  DEV_DB_PORT,
  TEST_DB_HOST,
  TEST_DB_USER,
  TEST_DB_PASSWORD,
  TEST_DB_DATABASE,
  TEST_DB_PORT,
} = process.env;

const ssl = { rejectUnauthorized: false };

const configs = {
  dev: {
    host: DEV_DB_HOST,
    user: DEV_DB_USER,
    password: DEV_DB_PASSWORD,
    database: DEV_DB_DATABASE,
    port: DEV_DB_PORT ?? DB_PORT,
    ssl,
  },
  test: {
    host: TEST_DB_HOST,
    user: TEST_DB_USER,
    password: TEST_DB_PASSWORD,
    database: TEST_DB_DATABASE,
    port: TEST_DB_PORT ?? DB_PORT,
    ssl,
  },
};

const environment = DB_ENVIRONMENT || 'dev';

export const pool = new Pool(configs[environment]);
