import { canonicalizeSkill } from "./canonicalSkill.util.js";

export const calculateMatchRatio = (resumeItems = [], jdItems = []) => {
  if (!jdItems || jdItems.length === 0) return 1; // logical default: if no requirements, 100% match
  if (!resumeItems || resumeItems.length === 0) return 0;

  const resumeSet = new Set(resumeItems.map(canonicalizeSkill));
  const jdCanonical = jdItems.map(canonicalizeSkill);

  const matchCount = jdCanonical.reduce((count, item) => {
    return count + (resumeSet.has(item) ? 1 : 0);
  }, 0);

  return matchCount / jdCanonical.length;
};
