import { useEffect, useState } from "react";
import api from "../api/axios";

export default function JobForm({ onCreated, existing }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔁 Restore JD after refresh
  useEffect(() => {
    const savedJob = localStorage.getItem("jobData");
    if (savedJob) {
      const parsed = JSON.parse(savedJob);
      setTitle(parsed.title || "");
      setDescription(parsed.description || "");
    }
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    persist(e.target.value, description);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    persist(title, e.target.value);
  };

  const persist = (title, description) => {
    localStorage.setItem(
      "jobData",
      JSON.stringify({ title, description })
    );
  };

  const createJob = async () => {
    if (!title || !description) return;

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/jobs", {
        title,
        description,
      });

      onCreated(res.data._id);
      localStorage.setItem("jobId", res.data._id);
    } catch {
      setError("Failed to create job description");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full flex flex-col transition-all duration-300 hover:shadow-md hover:border-indigo-100">
      <div className="flex justify-between items-center mb-6">
         <h2 className="text-lg font-bold text-gray-900">Job Details</h2>
         {existing && (
          <div className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded flex items-center gap-1 border border-green-100">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            Saved
          </div>
        )}
      </div>

      <div className="space-y-4 flex-1">
        <div className="space-y-1">
           <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Job Title</label>
           <input
            className="w-full border border-gray-200 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm font-medium bg-gray-50/50"
            placeholder="e.g. Senior Frontend Engineer"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <div className="space-y-1 flex-1 flex flex-col">
           <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Description</label>
           <textarea
            className="w-full flex-1 min-h-[120px] border border-gray-200 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm resize-none bg-gray-50/50"
            placeholder="Paste the full job description or requirements list here..."
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
      </div>

      <button
        onClick={createJob}
        disabled={loading}
        className={`mt-6 w-full py-3 rounded-lg text-sm font-semibold text-white shadow-sm transition-all duration-300 
          ${
            loading
              ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5"
          }`}
      >
        {loading ? "Saving..." : existing ? "Update Job Details" : "Save Job Details"}
      </button>

      {error && <p className="text-red-500 mt-3 text-xs text-center">{error}</p>}
    </div>
  );
}
