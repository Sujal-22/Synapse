import { useParams } from "react-router-dom";

export default function ManageHackathon() {
  const { id } = useParams();

  return (
    <main className="min-h-screen bg-gray-50 max-w-md mx-auto px-5 pt-12 pb-10">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-wide font-bold text-synapse-700">
          Event ID: {id}
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mt-1">Manage Event</h1>
        <p className="text-sm text-gray-400 mt-1">
          Monitor participants, teams, and submissions.
        </p>
      </header>

      <div className="space-y-4">
        <Panel title="Registered Participants" value="248" />
        <Panel title="Teams Formed" value="61" />
        <Panel title="Submitted Projects" value="38" />
        <Panel title="Mentor Bookings" value="17" />
      </div>
    </main>
  );
}

function Panel({ title, value }) {
  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
      <h2 className="font-bold text-gray-900">{title}</h2>
      <span className="text-2xl font-bold text-synapse-700">{value}</span>
    </div>
  );
}
