import { calculateSimilarity } from "../utils/similarity.util.js";
import { calculateMatchRatio } from "../utils/matchRatio.util.js";

export const calculateMatchScore = ({
  resumeEmbedding,
  jdEmbedding,
  resumeTools,
  jdTools,
  resumeAbilities,
  jdAbilities
}) => {
  const semanticSimilarity = calculateSimilarity(
    resumeEmbedding,
    jdEmbedding
  );

  const toolMatchRatio = calculateMatchRatio(
    resumeTools,
    jdTools
  );

  const abilityMatchRatio = calculateMatchRatio(
    resumeAbilities,
    jdAbilities
  );

  const score =
    semanticSimilarity * 40 +
    toolMatchRatio * 50 +
    abilityMatchRatio * 10;

  return {
    score: Math.round(score),
    breakdown: {
      semanticSimilarity,
      toolMatchRatio,
      abilityMatchRatio
    }
  };
};
