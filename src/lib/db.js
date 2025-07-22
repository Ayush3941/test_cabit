
const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");
const schema = require("../drizzle/schema");
const { env } = require("../data/env/server");

let db;

if (!global._db) {
    const pool = new Pool({
        connectionString: "postgresql://postgres.peykhrcroyixquwxmbhe:maggiatta123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
        ssl: {
            rejectUnauthorized: false,
        },
    });
    global._db = drizzle(pool, { schema });
}

db = global._db;

module.exports = { db };
