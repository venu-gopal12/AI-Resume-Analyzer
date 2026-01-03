import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  matchScore: Number,
  missingTools: [String],
  missingAbilities: [String],
  suggestions: [String]
}, { timestamps: true });

export default mongoose.model("Analysis", analysisSchema);
