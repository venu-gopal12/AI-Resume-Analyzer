import { extractTechnicalData  } from "../services/skillExtractor.service.js";

export const testSkillExtraction = async (req, res) => {
  const { text } = req.body;

  const skills = await extractTechnicalData(text);

  res.json(skills);
};
