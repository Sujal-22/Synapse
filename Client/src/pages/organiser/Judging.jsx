import { useParams } from "react-router-dom";

const SUBMISSIONS = [
  { name: "HealthAI", score: 34, status: "Scored" },
  { name: "CarbonTrack", score: 29, status: "Pending Review" },
  { name: "SkillBridge", score: 37, status: "Scored" },
];

export default function Judging() {
  const { id } = useParams();

  return (
    <main className="min-h-screen bg-gray-50 max-w-md mx-auto px-5 pt-12 pb-10">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-wide font-bold text-synapse-700">
          Event ID: {id}
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mt-1">Judging</h1>
        <p className="text-sm text-gray-400 mt-1">
          Track judging progress and project scores.
        </p>
      </header>

      <div className="space-y-4">
        {SUBMISSIONS.map((item) => (
          <article
            key={item.name}
            className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-bold text-gray-900">{item.name}</h2>
                <p className="text-sm text-gray-400 mt-1">{item.status}</p>
              </div>

              <span className="text-xl font-bold text-synapse-700">
                {item.score}/40
              </span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
