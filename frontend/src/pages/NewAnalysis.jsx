import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import ResumeUpload from "../components/ResumeUpload";
import JobForm from "../components/JobForm";
import { useAuth } from "../context/AuthContext";

export default function NewAnalysis() {
  const [resumeId, setResumeId] = useState(
    () => localStorage.getItem("resumeId")
  );
  const [jobId, setJobId] = useState(
    () => localStorage.getItem("jobId")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleResumeUploaded = (id) => {
    setResumeId(id);
    localStorage.setItem("resumeId", id);
  };

  const handleJobCreated = (id) => {
    setJobId(id);
    localStorage.setItem("jobId", id);
  };

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
    } catch {
      setError("Failed to analyze resume");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
             </div>
             <h1 className="text-xl font-bold tracking-tight text-gray-900">
              ResumeAI
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12">
        <div className="text-center mb-10">
          <button onClick={() => navigate('/dashboard')} className="mb-6 text-indigo-600 font-medium hover:text-indigo-800 flex items-center justify-center gap-2 transition-colors">
            ← Back to Dashboard
          </button>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">New Analysis</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">Upload your resume and the job description to get a detailed compatibility report.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="h-full">
             <ResumeUpload
               onUploaded={handleResumeUploaded}
               existing={resumeId}
             />
          </div>
          <div className="h-full">
            <JobForm
              onCreated={handleJobCreated}
              existing={jobId}
            />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
           <button
            disabled={!resumeId || !jobId || loading}
            onClick={analyzeMatch}
            className={`w-full md:w-auto px-12 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform flex items-center justify-center gap-3
              ${
                resumeId && jobId
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/30 hover:-translate-y-1"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Analyzing data...</span>
              </>
            ) : (
              <>
               <span>Generate Analysis</span>
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-center text-sm font-medium animate-fade-in">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
