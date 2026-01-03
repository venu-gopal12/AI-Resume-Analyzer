import { calculateMatchScore } from "../services/matchScore.service.js";

export const testMatchScore = async (req, res) => {
  const {
    resumeEmbedding,
    jdEmbedding,
    resumeTools,
    jdTools,
    resumeAbilities,
    jdAbilities
  } = req.body;

  const result = calculateMatchScore({
    resumeEmbedding,
    jdEmbedding,
    resumeTools,
    jdTools,
    resumeAbilities,
    jdAbilities
  });

  res.json(result);
};
