export default function ReportSection({ title, children }) {
  return (
    <section className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mt-4">
      <h2 className="font-bold text-gray-900 mb-3">{title}</h2>
      {children}
    </section>
  );
}

export function ReportList({ items = [] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="text-sm text-gray-500 flex gap-2">
          <span className="text-synapse-700">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
