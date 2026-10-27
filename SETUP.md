# Deploy: Vercel + Neon + Cloudinary
1. Neon: create project -> Connect -> copy the POOLED connection string (host contains "-pooler").
2. Seed clubs: put names in server/scripts/clubs.txt, then
   npm install && DATABASE_URL="<neon string>" node server/scripts/seedClubs.js
3. Push this folder to a GitHub repo -> Vercel "Add New Project" -> import it (Framework: Other; leave build settings, vercel.json handles them).
4. Vercel env vars: DATABASE_URL, COOKIE_SECRET, TOKEN_KEY, CLIENT_ID, AUDIENCE (values in .env.example).
5. Google Cloud Console -> your OAuth client -> add your https://<project>.vercel.app to "Authorized JavaScript origins".
6. Deploy. Test https://<project>.vercel.app/api/test

## Likes + notifications (one-time database step)
This adds two new tables (`ylike`, `ynotification`). Existing tables and data are not touched.
Create them once, **before or right after** deploying:

- Windows PowerShell:
  `$env:DATABASE_URL="<neon string>"; node server/scripts/syncDb.js`
- Mac/Linux:
  `DATABASE_URL="<neon string>" node server/scripts/syncDb.js`
- No terminal option: in Vercel add the env var `DB_SYNC=true`, redeploy, open the site once, then delete the variable.

It prints the list of tables; you should see `ylike` and `ynotification` in it. Running it again is harmless.
(If the tables are missing, the wall still loads, but likes show an error until they exist.)


