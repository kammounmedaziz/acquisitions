import 'dotenv/config';
import { neon, neonconfig } from '@neondatabase/serverless';

import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon (process.env.DATABASE_URL, neonconfig());

const db = drizzle(sql);

export { db , sql };
