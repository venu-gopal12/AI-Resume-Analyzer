
import express from "express";
import {
  login,
  register,
  logout,
  refreshAccessToken
} from "../controllers/auth.controller.js";
import { authLimiter } from "../middlewares/rateLimit.middleware.js";
const router = express.Router();

router.post("/login", authLimiter, login);
router.post("/register", authLimiter, register);
router.post("/refresh", authLimiter, refreshAccessToken);
router.post("/logout", authLimiter, logout);

export default router;
