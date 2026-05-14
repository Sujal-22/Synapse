import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/Constants";

export default function OrgDashboard() {
  return (
    <main className="min-h-screen bg-gray-50 max-w-md mx-auto px-5 pt-12 pb-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Organiser</h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage hackathons, judging, and analytics.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <Stat label="Registrations" value="248" />
        <Stat label="Teams" value="61" />
        <Stat label="Submissions" value="38" />
        <Stat label="Judges" value="8" />
      </div>

      <div className="space-y-3">
        <Action
          to={ROUTES.ORG_CREATE}
          title="Create Hackathon"
          desc="Publish a new hackathon event."
        />
        <Action
          to={ROUTES.ORG_MANAGE.replace(":id", "demo")}
          title="Manage Event"
          desc="Track teams, submissions, and mentors."
        />
        <Action
          to={ROUTES.ORG_JUDGING.replace(":id", "demo")}
          title="Judging"
          desc="Assign judges and monitor scoring."
        />
        <Action
          to={ROUTES.ORG_ANALYTICS.replace(":id", "demo")}
          title="Analytics"
          desc="View funnel, domains, and event health."
        />
      </div>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{label}</p>
    </div>
  );
}

function Action({ to, title, desc }) {
  return (
    <Link
      to={to}
      className="block bg-white rounded-3xl p-5 border border-gray-100 shadow-sm"
    >
      <h2 className="font-bold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-400 mt-1">{desc}</p>
    </Link>
  );
}
