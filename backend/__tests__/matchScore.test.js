import { calculateMatchScore } from '../services/matchScore.service.js';

// Mocking dependencies if necessary, but this service seems pure enough if inputs are numbers.
// Note: The service imports calculateSimilarity and calculateMatchRatio from utils, so we should testing integration or mock them.
// For now let's test the logic of the scoring function itself assuming the util functions work or are regular imports.
// Wait, the service IMPORTS them. 
// "import { calculateSimilarity } from "../utils/similarity.util.js";"
// Jest with ES modules will import the real files.
// Let's assume we want to test the orchestration/weights.

describe('calculateMatchScore', () => {
  // It's hard to test the internal values without mocking the utils, 
  // but we can test the expected output range and behavior.
  
  // Real test would involve mocking utils, but let's try to run with real utils first 
  // if they are pure math functions.
  
  test('should return score between 0 and 100', () => {
      const result = calculateMatchScore({
          resumeEmbedding: [0.1, 0.2, 0.3],
          jdEmbedding: [0.1, 0.2, 0.3],
          resumeTools: ['React'],
          jdTools: ['React'],
          resumeAbilities: ['Coding'],
          jdAbilities: ['Coding']
      });
      
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
      expect(result).toHaveProperty('breakdown');
  });
});
