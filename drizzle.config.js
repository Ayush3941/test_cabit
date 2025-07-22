const { defineConfig } = require("drizzle-kit");

module.exports = defineConfig({
  schema: "./src/drizzle/schema.js", // Or .ts if you want
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres:maggiatta123@db.peykhrcroyixquwxmbhe.supabase.co:5432/postgres",
  },
});
