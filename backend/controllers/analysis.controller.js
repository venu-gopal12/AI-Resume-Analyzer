import Resume from "../models/Resume.model.js";
import Job from "../models/Job.model.js";
import Analysis from "../models/Analysis.model.js";
import { extractTechnicalData } from "../services/skillExtractor.service.js";
import { buildCanonicalText } from "../utils/buildCanonicalText.util.js";

import { generateEmbedding } from "../services/embedding.service.js";
import { calculateMatchScore } from "../services/matchScore.service.js";
import { findMissingItems } from "../utils/gapAnalysis.util.js";
import { generateSuggestions } from "../services/suggestion.service.js";

import { canonicalizeSkill } from "../utils/canonicalSkill.util.js";

export const analyzeMatch = async (req, res) => {
  const { resumeId, jobId } = req.body;

  const resume = await Resume.findById(resumeId);
  const job = await Job.findById(jobId);

  const resumeData = await extractTechnicalData(resume.extractedText);
  const jobData = await extractTechnicalData(job.description);

  const resumeText = buildCanonicalText(resumeData);
  const jobText = buildCanonicalText(jobData);
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

  res.json(analysis);
};
