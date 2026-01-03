export default function MatchScore({ score }) {
  let color = "text-red-600";
  if (score >= 70) color = "text-green-600";
  else if (score >= 40) color = "text-yellow-500";

  return (
    <div className="bg-white p-6 rounded shadow text-center">
      <p className="text-gray-500 mb-2">Match Score</p>
      <p className={`text-5xl font-bold ${color}`}>
        {score}%
      </p>
    </div>
  );
}
