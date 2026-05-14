import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const DOMAIN_OPTIONS = [
  "AI/ML",
  "Web Development",
  "Mobile",
  "Blockchain/Web3",
  "DevTools",
  "EdTech",
  "HealthTech",
  "FinTech",
  "Sustainability",
  "AR/VR",
  "Open Source",
  "Social Impact",
];

const HACKATHONS = [
  {
    id: "ai-impact-hack",
    title: "AI Impact Hack",
    description:
      "Build AI-powered solutions for real-world problems and continue your prototype after the demo with Synapse AI guidance.",
    tags: ["AI/ML", "Social Impact", "Web Development"],
    prize_pool: "₹50,000",
    start_date: "01 Jun 2026",
    end_date: "03 Jun 2026",
    status: "upcoming",
    min_team_size: 2,
    max_team_size: 4,
  },
  {
    id: "web3-build-sprint",
    title: "Web3 Build Sprint",
    description:
      "Create blockchain, Web3, and decentralised applications with a team of complementary builders.",
    tags: ["Blockchain/Web3", "DevTools", "Open Source"],
    prize_pool: "₹75,000",
    start_date: "10 Jun 2026",
    end_date: "12 Jun 2026",
    status: "upcoming",
    min_team_size: 2,
    max_team_size: 4,
  },
  {
    id: "healthtech-innovation",
    title: "HealthTech Innovation Challenge",
    description:
      "Solve healthcare problems using software, AI, data, and user-focused product design.",
    tags: ["HealthTech", "AI/ML", "Mobile"],
    prize_pool: "₹40,000",
    start_date: "18 Jun 2026",
    end_date: "20 Jun 2026",
    status: "upcoming",
    min_team_size: 2,
    max_team_size: 5,
  },
  {
    id: "fintech-product-hack",
    title: "FinTech Product Hack",
    description:
      "Build secure financial technology products focused on payments, budgeting, fraud detection, and digital onboarding.",
    tags: ["FinTech", "Web Development", "AI/ML"],
    prize_pool: "₹60,000",
    start_date: "25 Jun 2026",
    end_date: "27 Jun 2026",
    status: "ongoing",
    min_team_size: 2,
    max_team_size: 4,
  },
  {
    id: "sustainability-hack",
    title: "Sustainability Hack",
    description:
      "Create technology solutions for climate awareness, carbon tracking, recycling, and sustainable communities.",
    tags: ["Sustainability", "Social Impact", "Open Source"],
    prize_pool: "₹35,000",
    start_date: "03 Jul 2026",
    end_date: "05 Jul 2026",
    status: "upcoming",
    min_team_size: 2,
    max_team_size: 4,
  },
  {
    id: "devtools-hackathon",
    title: "Developer Tools Hackathon",
    description:
      "Build tools that improve developer productivity, collaboration, debugging, deployment, and documentation.",
    tags: ["DevTools", "Open Source", "Web Development"],
    prize_pool: "₹80,000",
    start_date: "12 Jul 2026",
    end_date: "14 Jul 2026",
    status: "judging",
    min_team_size: 1,
    max_team_size: 4,
  },
];

const STATUS_FILTERS = [
  { label: "All", value: "" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Judging", value: "judging" },
  { label: "Ended", value: "ended" },
];

export default function Explore() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [domain, setDomain] = useState("");

  const filteredHackathons = useMemo(() => {
    return HACKATHONS.filter((hackathon) => {
      const matchesSearch =
        hackathon.title.toLowerCase().includes(search.toLowerCase()) ||
        hackathon.description.toLowerCase().includes(search.toLowerCase()) ||
        hackathon.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase()),
        );

      const matchesStatus = status ? hackathon.status === status : true;
      const matchesDomain = domain ? hackathon.tags.includes(domain) : true;

      return matchesSearch && matchesStatus && matchesDomain;
    });
  }, [search, status, domain]);

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div className="text-left">
            <p className="inline-flex rounded-full bg-synapse-50 px-4 py-2 text-sm font-bold text-synapse-700">
              Explore Hackathons
            </p>

            <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Discover hackathons that match your skills.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-500">
              Browse upcoming events, explore domains, check prize pools, and
              register for hackathons. You can explore freely, but registration
              requires login.
            </p>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-4">
              <Metric value={HACKATHONS.length} label="Events" />
              <Metric value="12+" label="Domains" />
              <Metric value="AI" label="Guided" />
            </div>
          </div>

          <div className="rounded-4xl bg-linear-to-br from-indigo-950 via-synapse-800 to-blue-900 p-8 text-white shadow-xl">
            <p className="text-sm font-semibold text-white/60">
              Synapse advantage
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Hackathons do not stop at submission.
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/70">
              After project submission, Synapse can generate a structured
              post-hackathon report with a bug checklist, roadmap, ownership
              plan, and commercialisation path.
            </p>

            <div className="mt-8 space-y-3">
              <FeatureLine text="AI-powered post-hackathon guidance" />
              <FeatureLine text="Complementary team matching" />
              <FeatureLine text="Structured project submission and judging" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-4xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Search hackathons
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, theme, or domain..."
                className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-sm text-gray-900 outline-none transition focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50"
              >
                {STATUS_FILTERS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setDomain("")}
              className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                domain === ""
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Domains
            </button>

            {DOMAIN_OPTIONS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setDomain(item)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  domain === item
                    ? "bg-synapse-700 text-white"
                    : "bg-synapse-50 text-synapse-700 hover:bg-synapse-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-black text-gray-900">
              Available Hackathons
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              {filteredHackathons.length} event
              {filteredHackathons.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        {filteredHackathons.length === 0 ? (
          <div className="rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <h3 className="text-xl font-black text-gray-900">
              No hackathons found
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Try changing the search, status, or domain filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredHackathons.map((hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function HackathonCard({ hackathon }) {
  return (
    <article className="group overflow-hidden rounded-4xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="h-44 bg-linear-to-br from-indigo-950 via-synapse-800 to-blue-800 p-5 text-white">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white/80 ring-1 ring-white/10">
            {hackathon.status}
          </span>

          <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold text-emerald-100 ring-1 ring-emerald-300/20">
            {hackathon.prize_pool}
          </span>
        </div>

        <h3 className="mt-10 line-clamp-2 text-2xl font-black leading-tight">
          {hackathon.title}
        </h3>
      </div>

      <div className="p-6">
        <p className="line-clamp-2 min-h-12 text-sm leading-6 text-gray-500">
          {hackathon.description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <InfoBox label="Starts" value={hackathon.start_date} />
          <InfoBox
            label="Team Size"
            value={`${hackathon.min_team_size}-${hackathon.max_team_size}`}
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {hackathon.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Link
            to={`/hackathon/${hackathon.id}`}
            className="flex-1 rounded-2xl bg-gray-900 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-black"
          >
            View Details
          </Link>

          <Link
            to={`/hackathon/${hackathon.id}`}
            className="rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
          >
            Register
          </Link>
        </div>
      </div>
    </article>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-3">
      <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-black text-gray-900">{value}</p>
    </div>
  );
}

function Metric({ value, label }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <p className="text-2xl font-black text-gray-900">{value}</p>
      <p className="mt-1 text-xs font-semibold text-gray-400">{label}</p>
    </div>
  );
}

function FeatureLine({ text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-black text-synapse-700">
        ✓
      </span>
      <p className="text-sm font-semibold text-white/80">{text}</p>
    </div>
  );
}
