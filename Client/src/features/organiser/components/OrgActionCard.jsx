import { Link } from "react-router-dom";

export default function OrgActionCard({ to, title, desc }) {
  return (
    <Link
      to={to}
      className="block bg-white rounded-3xl p-5 border border-gray-100 shadow-sm active:scale-[.98] transition"
    >
      <h2 className="font-bold text-gray-900">{title}</h2>

      {desc && (
        <p className="text-sm text-gray-400 mt-1 leading-relaxed">{desc}</p>
      )}
    </Link>
  );
}
