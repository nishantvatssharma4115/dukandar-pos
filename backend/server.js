import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;
const allowList = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean)
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    const wildcardAllowed = allowList.includes("*");
    const isAllowed =
      !origin || allowList.length === 0 || wildcardAllowed || allowList.includes(origin);
    if (isAllowed) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

await connectDB();

app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is Live...");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Internal server error" : err.message;
  console.error(err);
  res.status(statusCode).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
  process.exit(1);
});