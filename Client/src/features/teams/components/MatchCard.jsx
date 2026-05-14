export default function MatchCard({
  name,
  skills = [],
  reason,
  match = 0,
  onInvite,
}) {
  return (
    <article className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-bold text-gray-900">{name}</h2>

          {reason && (
            <p className="text-sm text-gray-400 mt-1 leading-relaxed">
              {reason}
            </p>
          )}
        </div>

        <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full">
          {match}%
        </span>
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {onInvite && (
        <button
          type="button"
          onClick={onInvite}
          className="mt-4 w-full bg-synapse-700 text-white font-semibold rounded-2xl py-3"
        >
          Invite to Team
        </button>
      )}
    </article>
  );
}
