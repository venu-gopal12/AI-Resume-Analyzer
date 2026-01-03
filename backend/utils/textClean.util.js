export const cleanText = (text) => {
  return text
    .replace(/\s+/g, " ")
    .replace(/•/g, "")
    .replace(/[^\x00-\x7F]/g, "")
    .trim();
};
