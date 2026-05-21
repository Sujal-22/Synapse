import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/Constants";
import { useAuth } from "../../context/useAuth";

export default function Dashboard() {
  const { profile } = useAuth();
  const displayName = profile?.full_name || profile?.username || "Builder";

  // Dummy data; replace with Supabase queries
  const hackathons = [
    {
      id: "ai-impact-hack",
      title: "AI Impact Hack",
      description: "Build AI-powered products that solve real-world problems.",
      startDate: "2026-06-01",
      teamSize: "2–4",
      tags: ["AI/ML", "Social Impact"],
      prize: "₹50,000",
      status: "Upcoming",
    },
    {
      id: "web3-build-sprint",
      title: "Web3 Build Sprint",
      description: "Create blockchain, Web3 and decentralised applications.",
      startDate: "2026-07-10",
      teamSize: "2–4",
      tags: ["Blockchain/Web3", "DevTools"],
      prize: "₹75,000",
      status: "Upcoming",
    },
  ];

  const stats = {
    hackathons: 3,
    projects: 1,
    wins: 0,
  };

  return (
    <main className="min-h-screen w-full bg-gray-50">
      {/* Hero */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto w-full max-w-340 px-6 py-16 sm:px-8 lg:px-10">
          <div className="rounded-4xl bg-linear-to-br from-indigo-950 via-synapse-800 to-blue-900 p-10 text-white shadow-xl">
            <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 ring-1 ring-white/10">
              Welcome back
            </p>
            <h1 className="mt-6 text-5xl font-black tracking-tight">
              Hello, {displayName}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
              Here’s a summary of your hackathon journey and ongoing projects.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <DashboardStat label="Hackathons" value={stats.hackathons} />
              <DashboardStat label="Projects" value={stats.projects} />
              <DashboardStat label="Wins" value={stats.wins} />
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Hackathons */}
      <section className="mx-auto w-full max-w-340 px-6 py-16 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-black text-gray-900">
              Upcoming Hackathons
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Discover new challenges aligned with your interests.
            </p>
          </div>
          <Link
            to={ROUTES.EXPLORE}
            className="ml-auto h-fit rounded-2xl bg-gray-900 px-6 py-3 text-sm font-bold text-white hover:bg-black"
          >
            Explore All
          </Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {hackathons.map((hack) => (
            <HackathonCard key={hack.id} hackathon={hack} />
          ))}
        </div>
      </section>

      {/* My Teams and Projects (placeholder content) */}
      <section className="mx-auto w-full max-w-340 px-6 pb-16 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-black text-gray-900">My Teams</h2>
            <p className="mt-1 text-sm text-gray-500">
              Collaborate and track your ongoing projects.
            </p>
          </div>
          <Link
            to={ROUTES.TEAMS}
            className="ml-auto h-fit rounded-2xl bg-synapse-700 px-6 py-3 text-sm font-bold text-white hover:bg-synapse-800"
          >
            Find Team
          </Link>
        </div>
        <p className="mt-6 text-gray-500">
          You are not part of any team yet. Join or create a team to start.
        </p>
      </section>

      {/* Call to Action for AI Guidance */}
      <section className="bg-gray-900 text-white">
        <div className="mx-auto w-full max-w-340 px-6 py-16 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-bold text-white/60">AI Assistance</p>
              <h2 className="mt-3 text-4xl font-black">
                Turn your prototype into a product
              </h2>
              <p className="mt-3 text-lg leading-7 text-white/70">
                Generate a personalised bug-fix checklist and a 30-day roadmap
                with Synapse’s AI post-hackathon assistant.
              </p>
            </div>
            <div>
              <ul className="space-y-3">
                <GuidanceItem text="Bug-fix checklist" />
                <GuidanceItem text="7-day cleanup roadmap" />
                <GuidanceItem text="30-day MVP plan" />
                <GuidanceItem text="Ownership plan" />
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function DashboardStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-6 text-center ring-1 ring-white/10">
      <p className="text-3xl font-black">{value}</p>
      <p className="mt-1 text-sm font-semibold text-white/80">{label}</p>
    </div>
  );
}

function HackathonCard({ hackathon }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-4xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="h-40 bg-linear-to-br from-indigo-950 via-synapse-800 to-blue-800 p-5 text-white">
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white/80 ring-1 ring-white/10">
            {hackathon.status}
          </span>
          {hackathon.prize && (
            <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold text-emerald-100 ring-1 ring-emerald-300/20">
              {hackathon.prize}
            </span>
          )}
        </div>
        <h3 className="mt-10 line-clamp-2 text-xl font-black leading-tight">
          {hackathon.title}
        </h3>
      </div>
      <div className="flex flex-col justify-between gap-5 p-6">
        <p className="text-sm leading-6 text-gray-600">
          {hackathon.description}
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm font-bold">
          <span>
            <span className="text-gray-500">Starts: </span>
            {hackathon.startDate}
          </span>
          <span>
            <span className="text-gray-500">Team: </span>
            {hackathon.teamSize}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {hackathon.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            to={`/hackathon/${hackathon.id}`}
            className="flex-1 rounded-2xl bg-gray-900 px-4 py-3 text-center text-sm font-bold text-white hover:bg-black"
          >
            View Details
          </Link>
          <Link
            to={`/hackathon/${hackathon.id}`}
            className="rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
          >
            Register
          </Link>
        </div>
      </div>
    </article>
  );
}

function GuidanceItem({ text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-black text-synapse-700">
        ✓
      </span>
      <p className="text-sm font-semibold text-white/80">{text}</p>
    </div>
  );
}
