// Creates any tables that don't exist yet (like the new likes + notifications tables).
// It never changes or deletes existing tables or data.
//   DATABASE_URL="<your neon string>" node server/scripts/syncDb.js
const { postgresClient } = require("../db/postgres");
require("../models/index"); // registers all models

(async () => {
  await postgresClient.authenticate();
  await postgresClient.sync();
  const [rows] = await postgresClient.query(
    "select table_name from information_schema.tables where table_schema='public' order by 1"
  );
  console.log("Tables now in the database:", rows.map((r) => r.table_name).join(", "));
  await postgresClient.close();
})().catch((e) => { console.error(e); process.exit(1); });
