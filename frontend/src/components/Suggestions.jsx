export default function Suggestions({ suggestions }) {
    if (!suggestions || suggestions.length === 0) {
  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <p className="text-green-600">
        Your resume already aligns very well with this job 🎉
      </p>
    </div>
  );
}

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h2 className="font-semibold mb-3">
        Resume Improvement Suggestions
      </h2>

      <ul className="list-disc pl-5 space-y-2">
        {suggestions.map((s, idx) => (
          <li key={idx}>{s}</li>
        ))}
      </ul>
    </div>
  );
}
