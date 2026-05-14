export default function OrgMetricCard({ label, value }) {
  return (
    <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{label}</p>
    </div>
  );
}
