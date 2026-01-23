import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/analysis/history");
      setHistory(res.data);
    } catch (error) {
      console.error("Failed to fetch history", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this analysis?")) return;

    try {
      await api.delete(`/analysis/${id}`);
      setHistory(history.filter(item => item._id !== id));
    } catch (error) {
      console.error("Failed to delete analysis", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    logout();
  };

  const calculateAverageScore = () => {
    if (history.length === 0) return 0;
    const total = history.reduce((acc, curr) => acc + (curr.matchScore || 0), 0);
    return Math.round(total / history.length);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
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

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h2>
            <p className="text-gray-500 text-lg mt-1">Welcome back! Here's your application overview.</p>
          </div>
          <button
            onClick={() => navigate("/analyze")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2"
          >
            <span>+ New Analysis</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Total Analyses</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">{history.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Average Match Score</p>
            <p className={`text-4xl font-bold mt-2 ${calculateAverageScore() >= 70 ? "text-green-600" : calculateAverageScore() >= 40 ? "text-yellow-600" : "text-red-600"}`}>
              {calculateAverageScore()}%
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center bg-indigo-50 border-indigo-100">
             <div className="text-center">
                <p className="text-indigo-900 font-medium">Pro Tip</p>
                <p className="text-sm text-indigo-700 mt-1">Tailor your resume for each job to boost your score!</p>
             </div>
          </div>
        </div>

        {/* Recent Activity */}
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Analyses</h3>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
             <div className="p-12 text-center text-gray-500">Loading history...</div>
          ) : history.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📝</div>
              <h3 className="text-lg font-medium text-gray-900">No analyses yet</h3>
              <p className="text-gray-500 mt-2 mb-6">Start your first resume analysis to get insights.</p>
              <button onClick={() => navigate("/analyze")} className="text-indigo-600 font-bold hover:underline">Start Analysis</button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {history.map((item) => (
                <div key={item._id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold border ${
                        item.matchScore >= 70 ? "bg-green-50 text-green-700 border-green-100" :
                        item.matchScore >= 40 ? "bg-yellow-50 text-yellow-700 border-yellow-100" :
                        "bg-red-50 text-red-700 border-red-100"
                     }`}>
                       {item.matchScore}%
                     </div>
                     <div>
                       <h4 className="font-bold text-gray-900">{item.jobId?.title || "Unknown Job"}</h4>
                       <p className="text-sm text-gray-500">{item.jobId?.company || "Unknown Company"} • {formatDate(item.createdAt)}</p>
                     </div>
                  </div>
                  {/* Since we don't have a view-details route yet, we'll just show the date or placeholder action */}
                  {/* Implementing 'View Details' would require restructuring Analysis page to take ID, keeping it simple for now */}
                   <div className="flex items-center gap-4">
                       <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">Completed</span>
                       <button
                         onClick={(e) => handleDelete(item._id, e)}
                         className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full group"
                         title="Delete Analysis"
                       >
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                         </svg>
                       </button>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
