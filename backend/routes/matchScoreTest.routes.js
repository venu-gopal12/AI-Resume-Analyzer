import express from "express";
import { testMatchScore } from "../controllers/matchScoreTest.controller.js";

const router = express.Router();

router.post("/test", testMatchScore);

export default router;
