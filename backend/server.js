import express from "express";

import dotenv from "dotenv";
import connectDB from "./config/db.js";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import groqTestRoutes from "./routes/groqTest.routes.js";
import jobRoutes from "./routes/job.routes.js";

import skillTestRoutes from "./routes/skillTest.routes.js";
import embeddingTestRoutes from "./routes/embeddingTest.routes.js";
import matchScoreTestRoutes from "./routes/matchScoreTest.routes.js";
import analysisRoutes from "./routes/analysis.routes.js";
import cookieParser from "cookie-parser";
import { generalLimiter } from "./middlewares/rateLimit.middleware.js";import { globalErrorHandler } from "./middlewares/error.middleware.js";
import morgan from "morgan";
import logger from "./utils/logger.js";
import cors from "cors";



dotenv.config();
connectDB();

const app = express();




app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(generalLimiter);
app.use(globalErrorHandler);


app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  })
);


app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/resumes", resumeRoutes);

app.use("/api/groq", groqTestRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/skills", skillTestRoutes);
app.use("/api/embeddings", embeddingTestRoutes);

app.use("/api/match-score", matchScoreTestRoutes);
app.use("/api/analysis", analysisRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
