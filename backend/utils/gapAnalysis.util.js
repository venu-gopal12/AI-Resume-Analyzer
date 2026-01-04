import { canonicalizeSkill } from "./canonicalSkill.util.js";

export const findMissingItems = (resumeItems = [], jdItems = []) => {
  const resumeSet = new Set(
    resumeItems.map(canonicalizeSkill)
  );

  return jdItems.filter(
    item => !resumeSet.has(canonicalizeSkill(item))
  );
};
