export const findMissingItems = (
  resumeItems = [],
  jdItems = []
) => {
  const resumeSet = new Set(
    resumeItems.map(i => i.toLowerCase())
  );

  return jdItems.filter(
    item => !resumeSet.has(item.toLowerCase())
  );
};
