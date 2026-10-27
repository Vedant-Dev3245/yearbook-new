const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const cors = require("cors");

const {Sequelize} = require("sequelize");
const {postgresClient} = require("./db/postgres");
const associatedModels = require('./models/index');
const {alterSync, forceSync} = require('./db/sync');

const {errorHandler, requestLogger} = require("./middleware/log")

const app = express();
const port = process.env.PORT || 3001;

// POSTGRESQL
// Setting Up Database and Models: 

// Connect + make sure the tables exist, once per server instance (retried if it fails).
let dbReady = null;
function ensureDb() {
  if (!dbReady) {
    dbReady = (async () => {
      if (process.env.DB_SYNC === "true") {
        // full sync of every table (only when you explicitly ask for it)
        await postgresClient.authenticate();
        await alterSync(postgresClient);
        console.log("Models have been synced succesfully");
      } else {
        // cheap "CREATE TABLE IF NOT EXISTS" for the likes + notifications tables.
        // Never blocks requests if it fails.
        try {
          await require("./models/like").Like.sync();
          await require("./models/notification").Notification.sync();
        } catch (e) {
          console.log("Could not ensure like/notification tables: ", e.message);
        }
      }

      // The nominations table got a new "readAt" column (unread nominations).
      // sync() never changes an existing table, so add it here. Safe to repeat.
      try {
        await postgresClient.query(
          'ALTER TABLE ynomination ADD COLUMN IF NOT EXISTS "readAt" TIMESTAMP WITH TIME ZONE'
        );
      } catch (e) {
        console.log("Could not ensure ynomination.readAt column: ", e.message);
      }
    })().catch((err) => {
      dbReady = null;
      throw err;
    });
  }
  return dbReady;
}

// Vercel keeps the "/api" prefix on the URL; the routes below don't use it.
app.use((req, res, next) => {
  if (req.url === "/api") req.url = "/";
  else if (req.url.startsWith("/api/")) req.url = req.url.slice(4);
  next();
});

app.use(async (req, res, next) => {
  try {
    await ensureDb();
    next();
  } catch (err) {
    console.log("Database setup failed: ", err.message);
    res.status(500).json({ status: "failure", message: "Database unavailable" });
  }
});

// COOKIES

app.use(cookieParser());
app.use(
  cookieSession({
    secret: process.env.COOKIE_SECRET,
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET],
    resave: false,
    saveUninitialized: false,
  })
);

// CORS

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// BODY PARSER

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// LISTEN

// On Vercel the app is exported (see /api/[...path].js); locally we listen on a port.
if (!process.env.VERCEL) {
  app.listen(port, () => console.log("Listening at port " + port));
}

// Error and Request logging middleware
app.use(errorHandler);
app.use(requestLogger);

// ROUTES

const authRoutes = require("./routes/auth");
const nominationRoutes = require("./routes/nominations");
// const pollRoutes = require("./routes/polls");
const profileRoutes = require("./routes/profile");
const commitmentRoutes = require("./routes/commitments")
const notificationRoutes = require("./routes/notifications");
const { isAuthenticated } = require("./middleware/auth");

app.use("/auth", authRoutes);
// app.use("/polls", isAuthenticated, pollRoutes);
app.use("/nominations", isAuthenticated, nominationRoutes);
app.use("/profiles", isAuthenticated, profileRoutes);
app.use("/notifications", isAuthenticated, notificationRoutes);
app.use("/commitments", commitmentRoutes);
// Commitments Routes without isAuthenticated middleware because we need to pull allCommitments in the form and updateUserCommitments during account creation.


app.get("/test", async (req, res) => {
  return res.json({ "Message": "endpoint is working fine." });
});

module.exports = app;