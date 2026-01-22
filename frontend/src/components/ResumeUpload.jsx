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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full flex flex-col transition-all duration-300 hover:shadow-md hover:border-indigo-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Resume</h2>
        <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded">PDF</span>
      </div>

      {/* ✅ Persisted UI state */}
      {existing ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 border border-dashed border-green-300 bg-green-50/50 rounded-xl mb-4">
          <div className="h-10 w-10 bg-white border border-green-200 text-green-600 rounded-full flex items-center justify-center mb-3 shadow-sm">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <span className="text-sm font-semibold text-green-800 mb-1">Resume uploaded</span>
          <p className="text-xs text-green-600 mb-3 text-center">Ready for analysis</p>
          <button
            onClick={handleReplace}
            className="text-xs font-medium text-gray-500 hover:text-indigo-600 underline transition-colors"
          >
            Upload different file
          </button>
        </div>
      ) : (
        <div className="flex-1 mb-4 flex flex-col">
          <label className="flex-1 flex flex-col items-center justify-center w-full min-h-[160px] border-2 border-gray-100 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 hover:border-indigo-300 transition-all duration-300 group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
               <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
               </div>
               <p className="mb-1 text-sm font-medium text-gray-700">Click to upload resume</p>
               <p className="text-xs text-gray-400">PDF up to 5MB</p>
            </div>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </label>
           {file && (
            <div className="mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100 flex items-center gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-indigo-600 flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-indigo-900 truncate">{file.name}</p>
                <p className="text-xs text-indigo-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          )}
        </div>
      )}

      {!existing && (
        <button
          onClick={uploadResume}
          disabled={loading || !file}
          className={`w-full py-3 rounded-lg text-sm font-semibold text-white shadow-sm transition-all duration-300 
            ${
              loading || !file
                ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5"
            }`}
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>
      )}

      {error && <p className="text-red-500 mt-3 text-xs text-center">{error}</p>}
    </div>
  );
}
