export default function MentorCard({ name, domain, availability, onBook }) {
  return (
    <article className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-2xl bg-synapse-50 flex items-center justify-center text-xl">
          🧑‍🏫
        </div>

        <div className="flex-1">
          <h2 className="font-bold text-gray-900">{name}</h2>
          <p className="text-sm text-gray-400">{domain}</p>

          {availability && (
            <p className="text-xs font-semibold text-synapse-700 mt-2">
              {availability}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onBook}
        className="mt-4 w-full bg-synapse-700 text-white font-semibold rounded-2xl py-3"
      >
        Book Slot
      </button>
    </article>
  );
}
