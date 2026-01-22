import { useLocation,useNavigate } from "react-router-dom";
import MatchScore from "../components/MatchScore";
import GapList from "../components/GapList";
import Suggestions from "../components/Suggestions";

export default function Analysis() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const analysis = state?.analysis;

  if (!analysis) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-500 font-medium">
      <div className="text-center">
         <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
         </div>
         <p>No analysis data available. Please analyze a resume first.</p>
         <button onClick={()=> navigate("/dashboard")} className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium text-sm">Go to Dashboard</button>
      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <button onClick={()=> navigate("/dashboard")} className="text-gray-500 hover:text-gray-900 transition-colors p-2 -ml-2 rounded-lg hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </button>
            <h1 className="text-lg font-bold text-gray-900">
              Analysis Results
            </h1>
          </div>
          <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-2 py-1 rounded">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-8 space-y-8">
        
        <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
          <MatchScore score={analysis.matchScore} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col h-full transform transition-all duration-300 hover:translate-y-[-2px]">
            <GapList
              title="Missing Tools"
              items={analysis.missingTools}
              color="orange"
              icon={
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              }
            />
          </div>
          <div className="flex flex-col h-full transform transition-all duration-300 hover:translate-y-[-2px]">
            <GapList
              title="Missing Technical Abilities"
              items={analysis.missingAbilities}
              color="red"
               icon={
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              }
            />
          </div>
        </div>

        <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
          <Suggestions suggestions={analysis.suggestions} />
        </div>
      </div>
    </div>
  );
}
