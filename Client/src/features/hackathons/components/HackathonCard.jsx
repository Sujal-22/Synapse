import { Link } from "react-router-dom";

export default function HackathonCard({
  id,
  title,
  description,
  tags = [],
  date,
  prize,
  status = "upcoming",
}) {
  return (
    <Link
      to={`/hackathon/${id}`}
      className="block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden active:scale-[.98] transition"
    >
      <div className="h-28 bg-gradient-to-br from-indigo-900 to-blue-700" />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-synapse-700 font-bold">
              {status}
            </p>

            <h2 className="text-lg font-bold text-gray-900 mt-1">{title}</h2>

            {date && <p className="text-sm text-gray-400 mt-1">{date}</p>}

            {description && (
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {description}
              </p>
            )}
          </div>

          {prize && (
            <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full whitespace-nowrap">
              {prize}
            </span>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
