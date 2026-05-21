import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { ROUTES } from "../../utils/Constants";

const SKILL_FILTERS = [
  "All",
  "Frontend",
  "Backend",
  "AI/ML",
  "UI/UX",
  "Mobile",
  "DevOps",
  "Blockchain",
];

const TEAM_MATCHES = [
  {
    id: "tm-1",
    name: "Aarav Sharma",
    username: "@aarav_ai",
    role: "AI/ML Engineer",
    match: 94,
    lookingFor: "Frontend + UI/UX",
    skills: ["Python", "ML", "FastAPI", "LangChain"],
    domains: ["AI/ML", "HealthTech"],
    bio: "Building AI agents and machine learning workflows for real-world products.",
  },
  {
    id: "tm-2",
    name: "Nisha Verma",
    username: "@nisha_designs",
    role: "UI/UX Designer",
    match: 88,
    lookingFor: "Backend Developer",
    skills: ["Figma", "UX Research", "React", "Design Systems"],
    domains: ["UI/UX", "EdTech"],
    bio: "Designs clean product flows, dashboards, landing pages, and mobile-first interfaces.",
  },
  {
    id: "tm-3",
    name: "Kabir Singh",
    username: "@kabir_backend",
    role: "Backend Developer",
    match: 84,
    lookingFor: "AI/ML + Frontend",
    skills: ["Node.js", "Supabase", "PostgreSQL", "REST API"],
    domains: ["Backend", "DevTools"],
    bio: "Builds scalable APIs, database schemas, and backend logic for hackathon products.",
  },
  {
    id: "tm-4",
    name: "Riya Mehta",
    username: "@riya_mobile",
    role: "Mobile Developer",
    match: 79,
    lookingFor: "UI/UX Designer",
    skills: ["React Native", "Expo", "Firebase", "UI Integration"],
    domains: ["Mobile", "Social Impact"],
    bio: "Creates cross-platform mobile apps and quick MVPs for student hackathons.",
  },
];

const OPEN_TEAMS = [
  {
    id: "team-1",
    name: "NeuroFlow",
    hackathon: "AI Impact Hack 2026",
    description:
      "Building an AI-powered mental health companion that gives mood insights and weekly wellbeing reports.",
    members: 3,
    maxMembers: 4,
    requiredSkills: ["Frontend", "UI/UX"],
    status: "Open",
  },
  {
    id: "team-2",
    name: "ChainProof",
    hackathon: "Web3 Build Sprint",
    description:
      "Creating a blockchain-based certificate verification platform for colleges and recruiters.",
    members: 2,
    maxMembers: 4,
    requiredSkills: ["Blockchain", "Backend"],
    status: "Open",
  },
  {
    id: "team-3",
    name: "CareBridge",
    hackathon: "HealthTech Innovation Challenge",
    description:
      "Designing a patient-doctor coordination dashboard with appointment tracking and AI triage.",
    members: 4,
    maxMembers: 5,
    requiredSkills: ["AI/ML", "Mobile"],
    status: "Open",
  },
];

export default function Teams() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [search, setSearch] = useState("");
  const [skillFilter, setSkillFilter] = useState("All");

  const filteredMatches = useMemo(() => {
    return TEAM_MATCHES.filter((member) => {
      const query = search.toLowerCase();

      const matchesSearch =
        member.name.toLowerCase().includes(query) ||
        member.username.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query) ||
        member.skills.some((skill) => skill.toLowerCase().includes(query));

      const matchesSkill =
        skillFilter === "All" ||
        member.skills.some((skill) =>
          skill.toLowerCase().includes(skillFilter.toLowerCase()),
        ) ||
        member.role.toLowerCase().includes(skillFilter.toLowerCase());

      return matchesSearch && matchesSkill;
    });
  }, [search, skillFilter]);

  function handleProtectedAction(actionName) {
    if (!user) {
      navigate(ROUTES.LOGIN, {
        state: {
          redirectTo: ROUTES.TEAMS,
        },
      });
      return;
    }

    console.log(`${actionName} clicked`);
  }

  const currentUsername = profile?.username ? `@${profile.username}` : "@user";

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-gray-50">
      {/* Hero */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto w-full max-w-340 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid w-full min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="min-w-0 rounded-4xl bg-linear-to-br from-indigo-950 via-synapse-800 to-blue-900 p-8 text-white shadow-xl">
              <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white/80 ring-1 ring-white/10">
                Team Formation
              </p>

              <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
                Find the right teammates for your next hackathon.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
                Discover complementary builders, join open teams, or create your
                own team. Synapse helps balance skills across frontend, backend,
                AI, UI/UX, mobile, and product roles.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <HeroStat value="24+" label="Builders" />
                <HeroStat value="8" label="Open Teams" />
                <HeroStat value="AI" label="Matching" />
              </div>
            </div>

            <aside className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-synapse-700">
                Your Matching Profile
              </p>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-900 text-2xl font-black text-white">
                  {(profile?.full_name || profile?.username || "U")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-xl font-black text-gray-900">
                    {profile?.full_name || "Guest Builder"}
                  </h2>
                  <p className="truncate text-sm font-semibold text-gray-400">
                    {currentUsername}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-gray-500">
                Add skills and domains in your profile to improve team
                recommendations.
              </p>

              <button
                type="button"
                onClick={() =>
                  user
                    ? navigate(ROUTES.PROFILE)
                    : navigate(ROUTES.LOGIN, {
                        state: { redirectTo: ROUTES.TEAMS },
                      })
                }
                className="mt-6 w-full rounded-2xl bg-gray-900 px-5 py-3.5 text-sm font-black text-white hover:bg-black"
              >
                {user ? "Update Profile" : "Login to Match"}
              </button>
            </aside>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="mx-auto w-full max-w-340 px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-4xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Search builders
              </label>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, role, username, or skill..."
                className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Skill filter
              </label>

              <select
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-sm text-gray-900 outline-none transition focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50"
              >
                {SKILL_FILTERS.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {SKILL_FILTERS.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => setSkillFilter(skill)}
                className={`rounded-full px-4 py-2 text-xs font-black transition ${
                  skillFilter === skill
                    ? "bg-synapse-700 text-white"
                    : "bg-synapse-50 text-synapse-700 hover:bg-synapse-100"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto grid w-full max-w-340 gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
        <div className="min-w-0 space-y-8">
          {/* AI Matches */}
          <section>
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-synapse-700">
                  Recommended Builders
                </p>
                <h2 className="mt-2 text-3xl font-black text-gray-900">
                  AI teammate suggestions
                </h2>
              </div>

              <p className="text-sm font-semibold text-gray-400">
                {filteredMatches.length} result
                {filteredMatches.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {filteredMatches.map((member) => (
                <BuilderCard
                  key={member.id}
                  member={member}
                  onInvite={() => handleProtectedAction("Invite teammate")}
                />
              ))}
            </div>
          </section>

          {/* Open Teams */}
          <section className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-synapse-700">
                  Open Teams
                </p>
                <h2 className="mt-2 text-3xl font-black text-gray-900">
                  Join an existing team
                </h2>
              </div>

              <button
                type="button"
                onClick={() => handleProtectedAction("Create team")}
                className="w-fit rounded-2xl bg-gray-900 px-5 py-3 text-sm font-black text-white hover:bg-black"
              >
                Create Team
              </button>
            </div>

            <div className="space-y-4">
              {OPEN_TEAMS.map((team) => (
                <OpenTeamCard
                  key={team.id}
                  team={team}
                  onJoin={() => handleProtectedAction("Join team")}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Right panel */}
        <aside className="space-y-8">
          <section className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-gray-900">
              How matching works
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              Synapse recommends teammates based on complementary skills. A good
              hackathon team usually needs frontend, backend, design, AI, and
              deployment capabilities.
            </p>

            <div className="mt-6 space-y-3">
              <ProcessStep number="01" text="Choose your skills and domains" />
              <ProcessStep number="02" text="Explore builders and open teams" />
              <ProcessStep number="03" text="Invite or join teammates" />
              <ProcessStep number="04" text="Submit project as a team" />
            </div>
          </section>

          <section className="rounded-4xl bg-gray-900 p-6 text-white shadow-xl">
            <p className="text-sm font-bold text-white/50">
              Team Quality Score
            </p>

            <h2 className="mt-3 text-3xl font-black">Balanced teams win.</h2>

            <p className="mt-4 text-sm leading-7 text-white/60">
              Prioritise role diversity, communication, ownership, and delivery
              speed over only choosing friends or similar-skill teammates.
            </p>

            <div className="mt-6 space-y-3">
              <QualityItem label="Frontend" value="React / UI" />
              <QualityItem label="Backend" value="API / Database" />
              <QualityItem label="AI" value="Model / Logic" />
              <QualityItem label="Product" value="Pitch / UX" />
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}

function HeroStat({ value, label }) {
  return (
    <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
      <p className="text-3xl font-black text-white">{value}</p>
      <p className="mt-1 text-sm font-semibold text-white/60">{label}</p>
    </div>
  );
}

function BuilderCard({ member, onInvite }) {
  return (
    <article className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-950 to-synapse-700 text-2xl font-black text-white">
            {member.name.charAt(0)}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-xl font-black text-gray-900">
              {member.name}
            </h3>
            <p className="truncate text-sm font-semibold text-gray-400">
              {member.username}
            </p>
            <p className="mt-1 text-sm font-bold text-synapse-700">
              {member.role}
            </p>
          </div>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
          {member.match}% match
        </span>
      </div>

      <p className="mt-5 text-sm leading-7 text-gray-500">{member.bio}</p>

      <div className="mt-5">
        <p className="text-xs font-black uppercase tracking-wide text-gray-400">
          Looking for
        </p>
        <p className="mt-1 text-sm font-black text-gray-900">
          {member.lookingFor}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {member.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onInvite}
          className="rounded-2xl bg-gray-900 px-4 py-3 text-sm font-black text-white hover:bg-black"
        >
          Invite
        </button>

        <button
          type="button"
          className="rounded-2xl border border-gray-200 px-4 py-3 text-sm font-black text-gray-700 hover:bg-gray-50"
        >
          View Profile
        </button>
      </div>
    </article>
  );
}

function OpenTeamCard({ team, onJoin }) {
  const progress = Math.round((team.members / team.maxMembers) * 100);

  return (
    <article className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-black text-gray-900">{team.name}</h3>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
              {team.status}
            </span>
          </div>

          <p className="mt-1 text-sm font-semibold text-synapse-700">
            {team.hackathon}
          </p>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-500">
            {team.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {team.requiredSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-gray-600"
              >
                Needs {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-52">
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-semibold text-gray-500">Members</span>
            <span className="font-black text-gray-900">
              {team.members}/{team.maxMembers}
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-synapse-700"
              style={{ width: `${progress}%` }}
            />
          </div>

          <button
            type="button"
            onClick={onJoin}
            className="mt-4 w-full rounded-2xl bg-synapse-700 px-4 py-3 text-sm font-black text-white hover:bg-synapse-800"
          >
            Request to Join
          </button>
        </div>
      </div>
    </article>
  );
}

function ProcessStep({ number, text }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-gray-50 p-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-synapse-700 text-xs font-black text-white">
        {number}
      </span>
      <p className="text-sm font-semibold leading-6 text-gray-600">{text}</p>
    </div>
  );
}

function QualityItem({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
      <span className="text-sm font-bold text-white/60">{label}</span>
      <span className="text-sm font-black text-white">{value}</span>
    </div>
  );
}
