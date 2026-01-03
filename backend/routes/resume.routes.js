import express from "express";
import { uploadResume } from "../middlewares/upload.middleware.js";
import { uploadResume as uploadController } from "../controllers/resume.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  uploadResume.single("resume"),
  uploadController
);
console.log("Resume routes loaded");


export default router;
