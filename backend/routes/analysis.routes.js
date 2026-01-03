import express from "express";
import { analyzeMatch } from "../controllers/analysis.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/match", protect, analyzeMatch);

export default router;
