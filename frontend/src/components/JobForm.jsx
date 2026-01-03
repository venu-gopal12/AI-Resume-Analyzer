import { useState } from "react";
import api from "../api/axios";

export default function JobForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createJob = async () => {
    if (!title || !description) return;

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/jobs", {
        title,
        description
      });
      onCreated(res.data._id);
    } catch {
      setError("Failed to create job description");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="font-semibold mb-3">Job Description</h2>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Job Title"
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border p-2 mb-3"
        rows="5"
        placeholder="Paste job description here"
        onChange={e => setDescription(e.target.value)}
      />

      <button
        onClick={createJob}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : "Save Job"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
