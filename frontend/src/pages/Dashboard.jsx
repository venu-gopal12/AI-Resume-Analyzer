import ResumeUpload from "../components/ResumeUpload";
import JobForm from "../components/JobForm";
import { useState } from "react";

export default function Dashboard() {
  const [resumeId, setResumeId] = useState(null);
  const [jobId, setJobId] = useState(null);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Resume & Job Analysis
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResumeUpload onUploaded={setResumeId} />
        <JobForm onCreated={setJobId} />
      </div>

      <button
        disabled={!resumeId || !jobId}
        className={`mt-6 w-full py-3 rounded text-white font-semibold
          ${resumeId && jobId
            ? "bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"}`}
      >
        Analyze Match
      </button>
    </div>
  );
}
