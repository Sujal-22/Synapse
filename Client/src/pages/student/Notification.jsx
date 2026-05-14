const NOTIFICATIONS = [
  {
    title: "Submission window is open",
    body: "Submit your project before the deadline to unlock your AI post-hackathon report.",
    type: "submission",
  },
  {
    title: "New mentor slot available",
    body: "A mentor is available for AI/ML guidance today.",
    type: "mentor",
  },
];

export default function Notifications() {
  return (
    <main className="min-h-screen bg-gray-50 pb-24 max-w-md mx-auto px-5 pt-12">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <p className="text-sm text-gray-400 mt-1">
          Updates from your hackathons and teams.
        </p>
      </header>

      <div className="space-y-3">
        {NOTIFICATIONS.map((item) => (
          <article
            key={item.title}
            className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm"
          >
            <div className="flex gap-3">
              <div className="w-11 h-11 rounded-2xl bg-synapse-50 flex items-center justify-center">
                🔔
              </div>

              <div>
                <h2 className="font-bold text-gray-900">{item.title}</h2>
                <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                  {item.body}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
