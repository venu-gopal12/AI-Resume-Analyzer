import Resume from "../models/Resume.model.js";
import Job from "../models/Job.model.js";
import Analysis from "../models/Analysis.model.js";
import { extractTechnicalData } from "../services/skillExtractor.service.js";
import { buildCanonicalText } from "../utils/buildCanonicalText.util.js";
import { generateEmbedding } from "../services/embedding.service.js";
import { calculateMatchScore } from "../services/matchScore.service.js";
import { findMissingItems } from "../utils/gapAnalysis.util.js";
import { generateSuggestions } from "../services/suggestion.service.js";
import logger from "../utils/logger.js";
import { canonicalizeSkill } from "../utils/canonicalSkill.util.js";
import {
  generateCacheKey,
  getFromCache,
  setToCache
} from "../utils/cache.util.js";
import { rewriteResumeContent } from "../services/rewrite.service.js";


export const analyzeMatch = async (req, res) => {
  const { resumeId, jobId } = req.body;

  const resume = await Resume.findById(resumeId);
  const job = await Job.findById(jobId);

  const resumeData = await extractTechnicalData(resume.extractedText);
  const jobData = await extractTechnicalData(job.description);

 const resumeText = buildCanonicalText(resumeData);
const jobText = buildCanonicalText(jobData);

const cacheKey = generateCacheKey(resumeText, jobText);

// 🔥 CACHE HIT
const cachedResult = getFromCache(cacheKey);
if (cachedResult) {
  logger.info("Cache hit for analysis", { cacheKey });
  return res.json(cachedResult);
}
// 2️⃣ Cache miss → log ONCE
logger.info("Cache miss — computing analysis", { cacheKey });

  console.log("===== RAW EXTRACTION =====");
  console.log("Resume tools:", resumeData.toolsAndTechnologies);
  console.log("JD tools:", jobData.toolsAndTechnologies);

  console.log("===== CANONICALIZED =====");
  console.log(
    "Resume canon:",
    resumeData.toolsAndTechnologies.map(canonicalizeSkill)
  );
  console.log("JD canon:", jobData.toolsAndTechnologies.map(canonicalizeSkill));

  const resumeEmbedding = await generateEmbedding(resumeText);
  const jobEmbedding = await generateEmbedding(jobText);

  const { score } = calculateMatchScore({
    resumeEmbedding,
    jdEmbedding: jobEmbedding,
    resumeTools: resumeData.toolsAndTechnologies,
    jdTools: jobData.toolsAndTechnologies,
    resumeAbilities: resumeData.technicalAbilities,
    jdAbilities: jobData.technicalAbilities,
  });

  const missingTools = findMissingItems(
    resumeData.toolsAndTechnologies,
    jobData.toolsAndTechnologies
  );

  const missingAbilities = findMissingItems(
    resumeData.technicalAbilities,
    jobData.technicalAbilities
  );

  const suggestions = await generateSuggestions({
    missingTools,
    missingAbilities,
    jobTitle: job.title,
  });

  const analysis = await Analysis.create({
    userId: req.user.userId,
    resumeId,
    jobId,
    matchScore: score,
    missingTools,
    missingAbilities,
    suggestions,
  });
  //  STORE IN CACHE
setToCache(cacheKey, analysis.toObject());


logger.info("Cache set for analysis", { cacheKey });

  res.json(analysis);
};

export const getUserHistory = async (req, res) => {
  try {
    const history = await Analysis.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .select("matchScore createdAt")
      .populate("jobId", "title company")
      .limit(10); // Limit to last 10 for now

    res.json(history);
  } catch (error) {
    logger.error("Error fetching user history", error);
    res.status(500).json({ message: "Failed to fetch history" });
  }
};

export const rewriteResume = async (req, res) => {
  const { resumeId, jobId, missingSkills } = req.body;

  try {
    const resume = await Resume.findById(resumeId);
    const job = await Job.findById(jobId);

    if (!resume || !job) {
      return res.status(404).json({ message: "Resume or Job not found" });
    }

    const rewrites = await rewriteResumeContent({
      resumeText: resume.extractedText,
      jobDescription: job.description,
      missingSkills: missingSkills || []
    });

    res.json(rewrites);
  } catch (error) {
    logger.error("Error rewriting resume", error);
    res.status(500).json({ message: "Failed to rewrite resume" });
  }
};

export const deleteAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId // Ensure user owns the analysis
    });

    if (!analysis) {
      return res.status(404).json({ message: "Analysis not found or unauthorized" });
    }

    res.json({ message: "Analysis deleted successfully" });
  } catch (error) {
    logger.error("Error deleting analysis", error);
    res.status(500).json({ message: "Failed to delete analysis" });
  }
};
