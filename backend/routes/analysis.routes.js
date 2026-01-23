import express from "express";
import { analyzeMatch, getUserHistory, rewriteResume, deleteAnalysis } from "../controllers/analysis.controller.js";


import { analysisLimiter } from "../middlewares/rateLimit.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/match", protect, analysisLimiter, analyzeMatch);
router.get("/history", protect, getUserHistory);
router.post("/rewrite", protect, rewriteResume);
router.delete("/:id", protect, deleteAnalysis);

export default router;
