export default function Suggestions({ suggestions }) {
    if (!suggestions || suggestions.length === 0) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mt-6 flex flex-col items-center justify-center py-10">
      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
      </div>
      <p className="text-gray-900 font-semibold mb-1">Excellent!</p>
      <p className="text-gray-500 text-sm">Your resume matches the job description perfectly.</p>
    </div>
  );
}

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mt-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">AI Recommendations</h2>
          <p className="text-xs text-gray-500">Actionable steps to improve your resume</p>
        </div>
      </div>

      <div className="grid gap-4">
        {suggestions.map((s, idx) => (
          <div key={idx} className="flex gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100 transition-all duration-300 hover:bg-indigo-50/30 hover:border-indigo-100 hover:-translate-y-0.5 group">
             <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-400 flex items-center justify-center group-hover:border-indigo-200 group-hover:text-indigo-600 transition-colors">
                {idx + 1}
             </div>
             <p className="text-gray-700 text-sm leading-relaxed">{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
