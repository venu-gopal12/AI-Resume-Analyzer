import { useState } from "react";
import api from "../api/axios";

export default function ResumeUpload({ onUploaded, existing }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const uploadResume = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await api.post("/resumes/upload", formData);
      onUploaded(res.data.resumeId);

      setFile(null);
    } catch {
      setError("Failed to upload resume");
    } finally {
      setLoading(false);
    }
  };

  const handleReplace = () => {
    localStorage.removeItem("resumeId");
    setFile(null);
    onUploaded(null); // reset parent state
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="font-semibold mb-3">Upload Resume (PDF)</h2>

      {/* ✅ Persisted UI state */}
      {existing && (
        <div className="mb-3 text-sm text-green-600 flex justify-between items-center">
          <span>Resume already uploaded ✔</span>
          <button
            onClick={handleReplace}
            className="underline text-blue-600"
          >
            Replace
          </button>
        </div>
      )}

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm"
      />

      <button
        onClick={uploadResume}
        disabled={loading}
        className={`mt-3 px-4 py-2 rounded text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Uploading..." : existing ? "Replace Resume" : "Upload"}
      </button>

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
}
