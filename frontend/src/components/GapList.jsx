export default function GapList({ title, items, color = "indigo", icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full flex flex-col hover:border-indigo-100 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-4">
        {icon && (
          <div className="p-2 bg-gray-50 rounded-lg">
            {icon}
          </div>
        )}
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        <span className="ml-auto text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{items.length} issues</span>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 py-10 bg-green-50/50 rounded-lg border border-green-100 border-dashed">
           <svg className="w-10 h-10 text-green-500 mb-2 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
           <span className="font-semibold text-green-700 text-sm">Perfect match! No gaps detected.</span>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
              <span className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 bg-${color}-500 shadow-sm`}></span>
              <span className="text-sm text-gray-600 group-hover:text-gray-900 leading-relaxed font-medium transition-colors">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
