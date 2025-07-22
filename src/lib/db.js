const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");
const schema = require("../drizzle/schema");
const { env } = require("../data/env/server");

let db;

if (!global._db) {
  const pool = new Pool({
    connectionString: "postgresql://postgres:maggiatta123@db.peykhrcroyixquwxmbhe.supabase.co:5432/postgres",
    ssl: {
      rejectUnauthorized: false, // Supabase requires this on Vercel
    },
  });

  global._db = drizzle(pool, { schema });
}

db = global._db;

module.exports = { db };
