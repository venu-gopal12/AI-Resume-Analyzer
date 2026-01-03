import { extractSkills } from "../services/skillExtractor.service.js";

export const testSkillExtraction = async (req, res) => {
  const { text } = req.body;

  const skills = await extractSkills(text);

  res.json(skills);
};
