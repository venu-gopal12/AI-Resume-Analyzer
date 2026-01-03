import { useState } from "react";
import api from "../api/axios";

export default function ResumeUpload({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const uploadResume = async () => {
    if (!file) return;

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await api.post("/resumes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      onUploaded(res.data.resumeId);
    } catch {
      setError("Failed to upload resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="font-semibold mb-3">Upload Resume (PDF)</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={e => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadResume}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
