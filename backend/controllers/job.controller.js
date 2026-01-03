import Job from "../models/Job.model.js";

export const createJob = async (req, res) => {
  const { title, description } = req.body;

  const job = await Job.create({
    userId: req.user.userId,
    title,
    description
  });

  res.status(201).json(job);
};
