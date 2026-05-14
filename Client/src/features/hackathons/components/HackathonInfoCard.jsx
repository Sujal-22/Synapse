export default function HackathonInfoCard({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-3 text-center">
      <p className="text-lg font-bold text-gray-900">{value}</p>
      <p className="text-[11px] text-gray-400 mt-1">{label}</p>
    </div>
  );
}
