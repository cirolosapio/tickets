import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless';

import * as schema from '../database/schema'

export { sql, eq, and, or, desc } from 'drizzle-orm'

export const tables = schema

export function useDrizzle () {
  const sql = neon(process.env.DATABASE_URL!);
  return drizzle(sql, { schema })
}

export type Favorite = typeof schema.favorities.$inferSelect