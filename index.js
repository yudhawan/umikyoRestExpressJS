const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const { dbConnect, dbClose } = require("./db/connection");
const routes = require("./routes");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Security headers
app.use(helmet());

// CORS configuration
const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(
  cors({
    origin: corsOrigin === "*" ? true : corsOrigin.split(","),
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { error: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/userLogin", authLimiter);
app.use("/api/registerUser", authLimiter);

app.use(express.json({ limit: "1mb" }));
app.use("/api", routes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(`Unhandled error: ${err.message}`);
  res.status(err.status || 500).json({ error: "Internal server error" });
});

let server;

async function main() {
  await dbConnect();
  server = app.listen(port, () => {
    console.log(`Running on port ${port}`);
  });
}

function shutdown(signal) {
  console.log(`${signal} received. Shutting down gracefully...`);
  if (server) {
    server.close(() => {
      dbClose().then(() => {
        console.log("MongoDB connection closed.");
        process.exit(0);
      });
    });
  }
  setTimeout(() => {
    console.error("Forced shutdown after timeout");
    process.exit(1);
  }, 10000);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
