import express from "express";
import { testSkillExtraction } from "../controllers/skillTest.controller.js";

const router = express.Router();

router.post("/extract", testSkillExtraction);

export default router;
