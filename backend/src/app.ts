import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

import connectDatabase from "../config/db"
import { config } from "../config/main.config";
import { sendError } from "./utils/apiResponse";
import { checkDatabaseHealth, getDatabaseStatus } from "./utils/db.utils";


dotenv.config();

// Initialize database connection
connectDatabase()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    if (config.NODE_ENV === "production") process.exit(1);
  });

const app: Application = express();

// Trust proxy for secure headers when behind reverse proxy
app.set("trust proxy", 1);

// Middleware stack
app.use(helmet());
app.use(
  cors({
    origin: config.cors.origin,
    methods: config.cors.methods,
    credentials: true,
  })
);
app.use(
  rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    message: "Too many requests from this IP, please try again later.",
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(compression());

if (config.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}


// Root route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Gas Price Predictor API is running",
    environment: config.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});


// Global error handler
app.use((error: any, req: Request, res: Response, _next: NextFunction) => {
  console.error("Error handler:", error);

  if (error.name === "ValidationError")
    return sendError(res, "Validation Error", 400, error.message);

  if (error.code === "23505")
    return sendError(res, "Duplicate data error", 409, error.detail);

  sendError(
    res,
    config.NODE_ENV === "production" ? "Internal server error" : error.message,
    error.statusCode || 500,
    config.NODE_ENV === "production" ? undefined : error.stack
  );
});

export default app;
