// Adds clubs/departments to the database (skips ones that already exist).
// 1. Put one club name per line in server/scripts/clubs.txt
// 2. Run:  DATABASE_URL="<your neon url>" node server/scripts/seedClubs.js
const fs = require("fs");
const path = require("path");
const { postgresClient } = require("../db/postgres");
require("../models/index"); // registers models
const { Commitment } = require("../models/commitment");

(async () => {
  const names = fs
    .readFileSync(path.join(__dirname, "clubs.txt"), "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  await postgresClient.sync();
  let added = 0;
  for (const name of names) {
    const [, created] = await Commitment.findOrCreate({ where: { commitment_name: name } });
    if (created) added++;
  }
  console.log(`Done. ${added} added, ${names.length - added} already existed.`);
  await postgresClient.close();
})().catch((e) => { console.error(e); process.exit(1); });
