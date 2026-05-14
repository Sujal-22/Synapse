export default function StatCard({ label, value }) {
  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-3">
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-[11px] text-white/60 mt-1">{label}</p>
    </div>
  );
}
