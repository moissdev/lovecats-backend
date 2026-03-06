import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'localhost', 
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5433,
});

export const query = (text: string, params?: unknown[]): Promise<QueryResult> => {
  return pool.query(text, params);
};
