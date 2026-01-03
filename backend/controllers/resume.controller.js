import fs from "fs-extra";
import { createRequire } from "module";
import Resume from "../models/Resume.model.js";
import { cleanText } from "../utils/textClean.util.js";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No resume file uploaded" });
    }

    if (!req.user?.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const buffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(buffer);

    const cleanedText = cleanText(pdfData.text);

    const resume = await Resume.create({
      userId: req.user.userId,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      extractedText: cleanedText,
      wordCount: cleanedText.split(" ").length
    });

    await fs.remove(req.file.path);

    res.status(201).json({
      message: "Resume uploaded & parsed successfully",
      resumeId: resume._id
    });

  } catch (err) {
    console.error("RESUME UPLOAD ERROR:", err);
    res.status(500).json({
      error: "Resume parsing failed",
      details: err.message
    });
  }
};
