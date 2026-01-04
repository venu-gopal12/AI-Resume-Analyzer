import crypto from "crypto";

const cache = new Map();

export const generateCacheKey = (resumeText, jdText) => {
  const hash = crypto
    .createHash("sha256")
    .update(resumeText + jdText)
    .digest("hex");

  return hash;
};

export const getFromCache = (key) => {
  return cache.get(key);
};

export const setToCache = (key, value) => {
  cache.set(key, value);
};
