const { defineConfig } = require("drizzle-kit");

module.exports = defineConfig({
  schema: "./src/drizzle/schema.js", // Or .ts if you want
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres.peykhrcroyixquwxmbhe:maggiatta123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
  },
});
