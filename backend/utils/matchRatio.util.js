export const calculateMatchRatio = (resumeItems = [], jdItems = []) => {
  if (jdItems.length === 0) return 1;

  const resumeSet = new Set(
    resumeItems.map(i => i.toLowerCase())
  );

  const matched = jdItems.filter(
    item => resumeSet.has(item.toLowerCase())
  );

  return matched.length / jdItems.length;
};
