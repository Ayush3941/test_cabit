const { z } = require("zod");
const { env } = require("../data/env/server");
const { drizzle } = require("drizzle-orm/node-postgres");
const { Client } = require("pg");
const schema = require("./schema"); 

const client = new Client({
  connectionString: "postgresql://postgres.peykhrcroyixquwxmbhe:maggiatta123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
});

client.connect();

const db = drizzle(client, { schema });

module.exports = { db };
