import express from "express";
import { testEmbeddingSimilarity } from "../controllers/embeddingTest.controller.js";

const router = express.Router();

router.post("/compare", testEmbeddingSimilarity);

export default router;
