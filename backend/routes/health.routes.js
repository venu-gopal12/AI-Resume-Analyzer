import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ status: "OK", uptime: process.uptime() });
});

export default router;
