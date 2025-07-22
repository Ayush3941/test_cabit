const { z } = require("zod");
const { env } = require("../data/env/server");
const { drizzle } = require("drizzle-orm/node-postgres");
const { Client } = require("pg");
const schema = require("../drizzle/schema");  // assuming same path

let db;

if (!global._db) {
  const client = new Client({
    connectionString: env.DB_URL,
  });

  client.connect();

  global._db = drizzle(client, { schema });
}

db = global._db;

module.exports = { db };
