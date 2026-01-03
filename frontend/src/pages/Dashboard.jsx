import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import ResumeUpload from "../components/ResumeUpload";
import JobForm from "../components/JobForm";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [resumeId, setResumeId] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { logout } = useAuth();

  const navigate = useNavigate();

  const analyzeMatch = async () => {
    if (!resumeId || !jobId) return;

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/analysis/match", {
        resumeId,
        jobId,
      });

      navigate("/analysis", {
        state: { analysis: res.data },
      });
    } catch (err) {
      setError("Failed to analyze resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Resume & Job Analysis</h1>
        <button onClick={logout} className="text-sm text-red-600 underline">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResumeUpload onUploaded={setResumeId} />
        <JobForm onCreated={setJobId} />
      </div>

      <button
        disabled={!resumeId || !jobId || loading}
        onClick={analyzeMatch}
        className={`mt-6 w-full py-3 rounded text-white font-semibold
          ${
            resumeId && jobId ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
          }`}
      >
        {loading ? "Analyzing..." : "Analyze Match"}
      </button>

      {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
    </div>
  );
}
