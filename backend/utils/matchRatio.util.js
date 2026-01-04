import { canonicalizeSkill } from "./canonicalSkill.util.js";

export const calculateMatchRatio = (
  resumeItems = [],
  jdItems = []
) => {
  if (jdItems.length === 0) return 1;

  const resumeSet = new Set(
    resumeItems.map(canonicalizeSkill)
  );

  const matched = jdItems.filter(
    item => resumeSet.has(canonicalizeSkill(item))
  );

  return matched.length / jdItems.length;
};
