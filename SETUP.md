# Deploy: Vercel + Neon + Cloudinary
1. Neon: create project -> Connect -> copy the POOLED connection string (host contains "-pooler").
2. Seed clubs: put names in server/scripts/clubs.txt, then
   npm install && DATABASE_URL="<neon string>" node server/scripts/seedClubs.js
3. Push this folder to a GitHub repo -> Vercel "Add New Project" -> import it (Framework: Other; leave build settings, vercel.json handles them).
4. Vercel env vars: DATABASE_URL, COOKIE_SECRET, TOKEN_KEY, CLIENT_ID, AUDIENCE (values in .env.example).
5. Google Cloud Console -> your OAuth client -> add your https://<project>.vercel.app to "Authorized JavaScript origins".
6. Deploy. Test https://<project>.vercel.app/api/test
