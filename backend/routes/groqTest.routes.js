import express from "express";
import { testGroq } from "../controllers/groqTest.controller.js";

const router = express.Router();

router.get("/test", testGroq);

export default router;
