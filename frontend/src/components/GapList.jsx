export default function GapList({ title, items }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="font-semibold mb-3">{title}</h2>

      {items.length === 0 ? (
        <p className="text-green-600">No gaps found 🎉</p>
      ) : (
        <ul className="list-disc pl-5">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
