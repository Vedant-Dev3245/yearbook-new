// Vercel serverless entry: every /api/* request is handled by the Express app.
const app = require("../server/server");

module.exports = (req, res) => {
  // Vercel may pass the catch-all segments as a ?path= query instead of the real path.
  // Rebuild the real route (e.g. /auth/google) before handing over to Express.
  try {
    const u = new URL(req.url, "http://localhost");
    const parts = u.searchParams.getAll("path");
    if (parts.length) {
      u.searchParams.delete("path");
      const qs = u.searchParams.toString();
      req.url = "/" + parts.join("/").replace(/^\/+/, "") + (qs ? "?" + qs : "");
    }
  } catch (e) {}
  return app(req, res);
};
