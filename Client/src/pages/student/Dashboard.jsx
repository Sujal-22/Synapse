import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { ROUTES } from "../../utils/constants";
import {getDisplayName,getUsername,getAvatarLetter,} from "../../utils/userDisplay";

const ACTIVE_HACKATHON = {
  id: "ai-impact-hack",
  title: "AI Impact Hack",
  status: "Ongoing",
  deadline: "03 Jun 2026",
  progress: 68,
};

const MY_HACKATHONS = [
  {
    id: "ai-impact-hack",
    title: "AI Impact Hack",
    status: "Ongoing",
    date: "01 Jun - 03 Jun",
    role: "Participant",
  },
  {
    id: "web3-build-sprint",
    title: "Web3 Build Sprint",
    status: "Upcoming",
    date: "10 Jun - 12 Jun",
    role: "Participant",
  },
  {
    id: "healthtech-innovation",
    title: "HealthTech Innovation Challenge",
    status: "Registered",
    date: "18 Jun - 20 Jun",
    role: "Participant",
  },
];

const QUICK_ACTIONS = [
  {
    title: "Explore Hackathons",
    description: "Find upcoming events that match your skills.",
    to: ROUTES.EXPLORE,
    icon: "🔎",
  },
  {
    title: "Find Team",
    description: "Get AI-based teammate suggestions.",
    to: ROUTES.TEAMS,
    icon: "🤝",
  },
  {
    title: "Submit Project",
    description: "Upload repo, demo, README, and tech stack.",
    to: ROUTES.SUBMISSION.replace(":hackathonId", "ai-impact-hack"),
    icon: "🚀",
  },
  {
    title: "AI Report",
    description: "View post-hackathon roadmap and next actions.",
    to: ROUTES.POST_HACKATHON.replace(":submissionId", "demo-submission"),
    icon: "🧠",
  },
];

const TEAM_MATCHES = [
  {
    name: "Aarav Sharma",
    skills: ["Python", "FastAPI", "ML"],
    match: 92,
  },
  {
    name: "Nisha Verma",
    skills: ["Figma", "UI/UX", "React"],
    match: 86,
  },
  {
    name: "Kabir Singh",
    skills: ["Node.js", "Supabase", "API"],
    match: 81,
  },
];

const NOTIFICATIONS = [
  {
    title: "Submission window is open",
    body: "Submit your project before the hackathon deadline.",
  },
  {
    title: "AI report available after submission",
    body: "Your team will receive a roadmap, bug checklist, and ownership plan.",
  },
];

export default function Dashboard() {
  const { user,profile } = useAuth();

  const displayName = getDisplayName(profile,user);
  const username = getUsername(profile,user);
  const avatarLetter = getAvatarLetter(profile,user);

  const role = profile?.role || "participant";

  const profileCompletion = calculateProfileCompletion(profile);

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-gray-50">
      {/* Top Hero */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto w-full max-w-340 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid w-full min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_340px] x1:grid-cols-[minmax(0,1fr)_360px]">
            <div className="min-w-0 rounded-4xl bg-linear-to-br from-indigo-950 via-synapse-800 to-blue-900 p-8 text-white shadow-xl">
              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
                <div>
                  <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white/80 ring-1 ring-white/10">
                    Student Dashboard
                  </p>

                  <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
                    Welcome back, {getFirstName(displayName)}.
                  </h1>

                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                    Track your registered hackathons, manage teams, submit
                    projects, and continue building with Synapse AI guidance.
                  </p>
                </div>

                <div className="flex items-center gap-4 rounded-3xl bg-white/10 p-4 ring-1 ring-white/10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-black text-synapse-700">
                    {profile?.avatar_url ? (
                      <img
                        src={profile?.avatar_url}
                        alt={displayName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                        avatarLetter
                      ) }
                  </div>

                  <div>
                    <p className="font-bold text-white" title={displayName}>{displayName}</p>
                    <p className="truncate text-sm text-white" title={username}>{ username }</p>
                    <p className="text-sm capitalize text-white/60" title={role}>{role}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <HeroStat
                  label="Hackathons"
                  value={profile?.hackathons_count ?? 3}
                />
                <HeroStat
                  label="Projects"
                  value={profile?.projects_count ?? 1}
                />
                <HeroStat label="Wins" value={profile?.wins_count ?? 0} />
              </div>
            </div>

            <div className="min-w-0 rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-synapse-700">
                Active Hackathon
              </p>

              <h2 className="mt-3 text-2xl font-black text-gray-900">
                {ACTIVE_HACKATHON.title}
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Deadline: {ACTIVE_HACKATHON.deadline}
              </p>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-gray-600">
                    Submission progress
                  </span>
                  <span className="font-black text-gray-900">
                    {ACTIVE_HACKATHON.progress}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-synapse-700"
                    style={{ width: `${ACTIVE_HACKATHON.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link
                  to={`/hackathon/${ACTIVE_HACKATHON.id}`}
                  className="rounded-2xl border border-gray-200 px-4 py-3 text-center text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  Details
                </Link>

                <Link
                  to={ROUTES.SUBMISSION.replace(
                    ":hackathonId",
                    ACTIVE_HACKATHON.id,
                  )}
                  className="rounded-2xl bg-gray-900 px-4 py-3 text-center text-sm font-bold text-white hover:bg-white"
                >
                  Submit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <section className="mx-auto w-full max-w-340 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <section>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-gray-900">
                    Quick Actions
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Continue your hackathon workflow from here.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {QUICK_ACTIONS.map((item) => (
                  <QuickActionCard key={item.title} item={item} />
                ))}
              </div>
            </section>

            {/* My Hackathons */}
            <section className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-2xl font-black text-gray-900">
                    My Hackathons
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Events you have registered for.
                  </p>
                </div>

                <Link
                  to={ROUTES.EXPLORE}
                  className="w-fit rounded-xl bg-gray-900 px-4 py-2 text-sm font-bold text-white hover:bg-black"
                >
                  Explore More
                </Link>
              </div>

              <div className="w-full overflow-x-hidden rounded-3xl border border-gray-100">
                <div className="hidden min-w-180 grid-cols-[1.5fr_1fr_1fr_120px] bg-gray-50 px-5 py-3 text-xs font-black uppercase tracking-wide text-gray-400 md:grid">
                  <span>Event</span>
                  <span>Date</span>
                  <span>Status</span>
                  <span>Action</span>
                </div>

                <div className="divide-y divide-gray-100">
                  {MY_HACKATHONS.map((hackathon) => (
                    <HackathonRow key={hackathon.id} hackathon={hackathon} />
                  ))}
                </div>
              </div>
            </section>

            {/* AI Report CTA */}
            <section className="rounded-4xl bg-gray-900 p-8 text-white shadow-xl">
              <div className="grid w-full min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_340px] x1:grid-cols-[minmax(0,1fr0)_360px]">
                <div>
                  <p className="text-sm font-bold text-white/50">
                    Synapse AI Agent
                  </p>

                  <h2 className="mt-3 text-3xl font-black">
                    Convert your prototype into a real product roadmap.
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/60">
                    After submission, Synapse generates a structured report
                    containing a project summary, bug-fix checklist, 7-day
                    roadmap, 30-day roadmap, ownership plan, and
                    commercialisation path.
                  </p>
                </div>

                <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                  <div className="space-y-3">
                    <AIItem text="Bug-fix checklist" />
                    <AIItem text="7-day cleanup roadmap" />
                    <AIItem text="30-day MVP plan" />
                    <AIItem text="Team ownership plan" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <aside className="space-y-8">
            {/* Profile Completion */}
            <section className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-gray-900">
                Profile Completion
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Complete your profile to improve team matching.
              </p>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-gray-600">Progress</span>
                  <span className="font-black text-gray-900">
                    {profileCompletion}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-amber-500"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {!profile?.github_url && <MissingChip label="GitHub URL" />}
                {!profile?.linkedin_url && <MissingChip label="LinkedIn URL" />}
                {!profile?.bio && <MissingChip label="Bio" />}
                {(!profile?.skills || profile.skills.length === 0) && (
                  <MissingChip label="Skills" />
                )}
              </div>

              <Link
                to={ROUTES.PROFILE}
                className="mt-6 block rounded-2xl border border-gray-200 px-4 py-3 text-center text-sm font-bold text-gray-700 hover:bg-gray-50"
              >
                Update Profile
              </Link>
            </section>

            {/* Team Matches */}
            <section className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-gray-900">
                    Team Matches
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Complementary teammate suggestions.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {TEAM_MATCHES.map((member) => (
                  <TeamMatchCard key={member.name} member={member} />
                ))}
              </div>

              <Link
                to={ROUTES.TEAMS}
                className="mt-6 block rounded-2xl bg-synapse-700 px-4 py-3 text-center text-sm font-bold text-white hover:bg-synapse-800"
              >
                View All Matches
              </Link>
            </section>

            {/* Notifications */}
            <section className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-gray-900">
                Notifications
              </h2>

              <div className="mt-5 space-y-4">
                {NOTIFICATIONS.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-gray-50 p-4">
                    <h3 className="text-sm font-black text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                to={ROUTES.NOTIFICATIONS}
                className="mt-6 block text-sm font-bold text-synapse-700 hover:text-synapse-900"
              >
                View all notifications →
              </Link>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

function HeroStat({ label, value }) {
  return (
    <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
      <p className="text-3xl font-black text-white">{value}</p>
      <p className="mt-1 text-sm font-semibold text-white/60">{label}</p>
    </div>
  );
}

function QuickActionCard({ item }) {
  return (
    <Link
      to={item.to}
      className="group rounded-4xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-synapse-50 text-2xl transition group-hover:bg-synapse-700">
        <span className="transition group-hover:scale-110">{item.icon}</span>
      </div>

      <h3 className="mt-5 text-lg font-black text-gray-900">{item.title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">{item.description}</p>
    </Link>
  );
}

function HackathonRow({ hackathon }) {
  return (
    <div className="grid min-w-180 gap-4 px-5 py-5 md:grid-cols-[1.5fr_1fr_1fr_120px] md:items-center">
      <div>
        <h3 className="font-black text-gray-900">{hackathon.title}</h3>
        <p className="mt-1 text-sm text-gray-400">{hackathon.role}</p>
      </div>

      <p className="text-sm font-semibold text-gray-600">{hackathon.date}</p>

      <span className="w-fit rounded-full bg-synapse-50 px-3 py-1 text-xs font-black text-synapse-700">
        {hackathon.status}
      </span>

      <Link
        to={`/hackathon/${hackathon.id}`}
        className="w-fit rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50"
      >
        Open
      </Link>
    </div>
  );
}

function TeamMatchCard({ member }) {
  return (
    <div className="rounded-3xl border border-gray-100 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-900 text-sm font-black text-white">
            {member.name.charAt(0)}
          </div>

          <div>
            <h3 className="font-black text-gray-900">{member.name}</h3>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {member.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-bold text-gray-500"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
          {member.match}%
        </span>
      </div>
    </div>
  );
}

function MissingChip({ label }) {
  return (
    <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
      Missing {label}
    </span>
  );
}

function AIItem({ text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-black text-gray-900">
        ✓
      </span>
      <p className="text-sm font-semibold text-white/80">{text}</p>
    </div>
  );
}

function getFirstName(name = "") {
  return name.split(" ")[0] || "Builder";
}

function calculateProfileCompletion(profile) {
  if (!profile) return 35;

  const checks = [
    profile.full_name,
    profile.username,
    profile.college,
    profile.bio,
    profile.github_url,
    profile.linkedin_url,
    profile.skills?.length > 0,
    profile.domains?.length > 0,
  ];

  const completed = checks.filter(Boolean).length;

  return Math.round((completed / checks.length) * 100);
}
