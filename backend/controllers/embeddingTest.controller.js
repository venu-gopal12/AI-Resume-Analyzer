import { generateEmbedding } from "../services/embedding.service.js";
import { calculateSimilarity } from "../utils/similarity.util.js";

export const testEmbeddingSimilarity = async (req, res) => {
  const { textA, textB } = req.body;

  const vectorA = await generateEmbedding(textA);
  const vectorB = await generateEmbedding(textB);

  const similarity = calculateSimilarity(vectorA, vectorB);

  res.json({
    similarity
  });
};
