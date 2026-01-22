export const cleanText = (text = "") => {
  return text
    .replace(/\s+/g, " ")
    .replace(/•/g, "")
    .replace(/[^\u0020-\u007E]/g, "")
    .trim();
};
