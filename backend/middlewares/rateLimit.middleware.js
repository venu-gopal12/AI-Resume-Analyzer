import rateLimit from "express-rate-limit";

// 🔐 Auth limiter (login, refresh, logout)
export const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  message: {
    success: false,
    message: "Too many auth attempts. Try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});

// 🤖 AI limiter (analysis endpoints)
export const analysisLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many analysis requests. Please wait."
  },
  standardHeaders: true,
  legacyHeaders: false
});

// 🌍 General API limiter
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Slow down."
  },
  standardHeaders: true,
  legacyHeaders: false
});
