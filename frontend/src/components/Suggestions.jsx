export default function Suggestions({ suggestions }) {
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
