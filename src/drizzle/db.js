const { z } = require("zod");
const { env } = require("../data/env/server");
const { drizzle } = require("drizzle-orm/node-postgres");
const { Client } = require("pg");
const schema = require("./schema"); 

const client = new Client({
  connectionString: env.DB_URL,
});

client.connect();

const db = drizzle(client, { schema });

module.exports = { db };
