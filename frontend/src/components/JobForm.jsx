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
    <div className="bg-white p-6 rounded shadow">
      <h2 className="font-semibold mb-3">Job Description</h2>

      {existing && (
        <p className="text-green-600 text-sm mb-2">
          Job description saved ✔
        </p>
      )}

      <input
        className="w-full border p-2 mb-3"
        placeholder="Job Title"
        value={title}
        onChange={handleTitleChange}
      />

      <textarea
        className="w-full border p-2 mb-3"
        rows="5"
        placeholder="Paste job description here"
        value={description}
        onChange={handleDescriptionChange}
      />

      <button
        onClick={createJob}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Saving..." : "Save Job"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
