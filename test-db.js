import 'dotenv/config';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

async function testConnection() {
  try {
    console.log(
      'Testing connection to:',
      process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@')
    );

    const client = await pool.connect();
    console.log('✅ Connected successfully!');

    // Test query
    const result = await client.query('SELECT version()');
    console.log('✅ PostgreSQL version:', result.rows[0].version);

    // Check if users table exists
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log(
      '✅ Tables:',
      tables.rows.map(r => r.table_name)
    );

    // Create users table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        name varchar(256) NOT NULL,
        email varchar(256) NOT NULL UNIQUE,
        password varchar(512) NOT NULL,
        role varchar(50) DEFAULT 'user' NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `);
    console.log('✅ Users table ready');

    client.release();
    await pool.end();
    console.log('✅ All tests passed!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

testConnection();
