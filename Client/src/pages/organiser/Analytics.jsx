import { useParams } from "react-router-dom";

const FUNNEL = [
  { label: "Views", value: 1200 },
  { label: "Registered", value: 248 },
  { label: "Teams", value: 61 },
  { label: "Submitted", value: 38 },
];

export default function Analytics() {
  const { id } = useParams();

  return (
    <main className="min-h-screen bg-gray-50 max-w-md mx-auto px-5 pt-12 pb-10">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-wide font-bold text-synapse-700">
          Event ID: {id}
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mt-1">Analytics</h1>
        <p className="text-sm text-gray-400 mt-1">
          View registration funnel and event health.
        </p>
      </header>

      <section className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-4">Registration Funnel</h2>

        <div className="space-y-4">
          {FUNNEL.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{item.label}</span>
                <span className="text-gray-400">{item.value}</span>
              </div>

              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-synapse-700 rounded-full"
                  style={{
                    width: `${Math.min((item.value / 1200) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
