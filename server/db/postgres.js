const { Sequelize } = require("sequelize");
const pg = require("pg"); // explicit, so Vercel's bundler includes it

// Neon / production: set DATABASE_URL (use the *pooled* connection string)
// Local docker fallback: the old hard-coded settings.
const url = process.env.DATABASE_URL;

const postgresClient = url
  ? new Sequelize(url, {
      dialect: "postgres",
      dialectModule: pg,
      logging: false,
      dialectOptions: /localhost|127\.0\.0\.1/.test(url) ? {} : { ssl: { require: true, rejectUnauthorized: false } },
      pool: { max: 3, min: 0, idle: 10000, acquire: 30000 }, // small pool for serverless
    })
  : new Sequelize("testingyearbook", "postgres", "postgres", {
      host: "yearbookdb",
      port: 5432,
      dialect: "postgres",
      dialectModule: pg,
    });

module.exports = { postgresClient };
