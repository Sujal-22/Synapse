import { Link } from "react-router-dom";

export default function QuickActionCard({ to, icon, title, description }) {
  return (
    <Link
      to={to}
      className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm active:scale-[.98] transition"
    >
      <div className="w-11 h-11 rounded-2xl bg-synapse-50 flex items-center justify-center text-xl mb-3">
        {icon}
      </div>

      <p className="font-semibold text-gray-900">{title}</p>

      {description && (
        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
          {description}
        </p>
      )}
    </Link>
  );
}
