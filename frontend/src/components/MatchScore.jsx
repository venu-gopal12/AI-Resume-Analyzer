export default function MatchScore({ score }) {
  let colorClass = "text-red-600";
  let ringClass = "border-red-500";
  let bgClass = "bg-red-50";

  if (score >= 70) {
    colorClass = "text-green-600";
    ringClass = "border-green-500";
    bgClass = "bg-green-50";
  } else if (score >= 40) {
    colorClass = "text-yellow-600";
    ringClass = "border-yellow-500";
    bgClass = "bg-yellow-50";
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-md hover:border-indigo-100 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-50">
        <svg className="w-12 h-12 text-gray-100 group-hover:text-gray-200 transition-colors" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"></path></svg>
      </div>

      <p className="text-gray-500 mb-6 font-semibold uppercase tracking-widest text-xs z-10">Match Score</p>
      
      <div className="relative">
         {/* Simple background ring */}
         <div className="w-40 h-40 rounded-full border-4 border-gray-100"></div>
         {/* Score ring */}
         <div className={`absolute inset-0 w-40 h-40 rounded-full border-4 ${ringClass} flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-500 ${bgClass} bg-opacity-30`}>
             <div className="flex flex-col items-center">
                <span className={`text-5xl font-bold tracking-tighter ${colorClass}`}>
                 {score}%
                </span>
             </div>
         </div>
      </div>
      
      <p className="text-gray-500 text-sm mt-6 text-center max-w-lg leading-relaxed">
        Based on our analysis, this resume has a <span className={`font-semibold ${colorClass}`}>{score >= 70 ? 'High' : score >= 40 ? 'Moderate' : 'Low'}</span> relevance score for the provided job description.
      </p>
    </div>
  );
}
