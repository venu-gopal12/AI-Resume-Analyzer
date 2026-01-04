import express from "express";
import { analyzeMatch } from "../controllers/analysis.controller.js";


import { analysisLimiter } from "../middlewares/rateLimit.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/match", protect, analysisLimiter, analyzeMatch,
  analyzeMatch);

export default router;
