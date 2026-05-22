import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getHackathons } from "../../services/hackathonService";

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

const STATUS_FILTERS = [
  { label: "All", value: "" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Judging", value: "judging" },
  { label: "Ended", value: "ended" },
];


const CONTAINER = "mx-auto w-full max-w-340 px-4 sm:px-6 lg:px-8";

export default function Explore() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [domain, setDomain] = useState("");
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    async function loadHackathons() {
      setLoading(true);
      setServerError("");
      const result = await getHackathons();
      if (result.error) {
        console.error("Hackathon fetch error:", result.error.message);
        setServerError("Could not load hackathons from Supabase.");
        setHackathons([]);
      } else {
        setHackathons(result.data || []);
      }
      setLoading(false);
    }
    loadHackathons();
  }, []);

  const filteredHackathons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return hackathons.filter((hackathon) => {
      const tags = Array.isArray(hackathon.tags) ? hackathon.tags : [];
      const matchesSearch =
        !query ||
        hackathon.title?.toLowerCase().includes(query) ||
        hackathon.description?.toLowerCase().includes(query) ||
        hackathon.theme?.toLowerCase().includes(query) ||
        tags.some((tag) => tag.toLowerCase().includes(query));
      const matchesStatus = status ? hackathon.status === status : true;
      const matchesDomain = domain ? tags.includes(domain) : true;
      return matchesSearch && matchesStatus && matchesDomain;
    });
  }, [hackathons, search, status, domain]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-gray-50"
    style={{fontFamily:"instument serif"}}>
      {/* Hero */}
      <section className="border-b border-gray-100 bg-white">
        <div
          className={`${CONTAINER} grid grid-cols-1 gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20`}
        >
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
              <Metric value={hackathons.length} label="Events" />
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

      {/* Filters — same container, no max-w on section */}
      <section className="bg-gray-50 py-8">
        <div className={CONTAINER}>
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
        </div>
      </section>

      {/* Cards — same container, no max-w on section */}
      <section className="bg-gray-50 pb-20">
        <div className={CONTAINER}>
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

          {serverError && (
            <div className="mb-6 rounded-3xl border border-red-100 bg-red-50 p-5 text-sm font-semibold text-red-600">
              {serverError}
            </div>
          )}

          {loading && (
            <div className="rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">
              <p className="text-sm font-bold text-gray-500">
                Loading hackathons...
              </p>
            </div>
          )}

          {!loading && filteredHackathons.length === 0 && (
            <div className="rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">
              <h3 className="text-xl font-black text-gray-900">
                No hackathons found
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Try changing the search, status, or domain filter. If you have
                not launched a hackathon yet, create one from the organiser
                section.
              </p>
            </div>
          )}

          {!loading && filteredHackathons.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredHackathons.map((hackathon) => (
                <HackathonCard key={hackathon.id} hackathon={hackathon} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function HackathonCard({ hackathon }) {
  const tags = Array.isArray(hackathon.tags) ? hackathon.tags : [];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-4xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="h-44 bg-linear-to-br from-indigo-950 via-synapse-800 to-blue-800 p-5 text-white">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white/80 ring-1 ring-white/10">
            {hackathon.status || "upcoming"}
          </span>

          {hackathon.prize_pool && (
            <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold text-emerald-100 ring-1 ring-emerald-300/20">
              {hackathon.prize_pool}
            </span>
          )}
        </div>

        <h3 className="mt-10 line-clamp-2 text-2xl font-black leading-tight">
          {hackathon.title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="line-clamp-2 min-h-12 text-sm leading-6 text-gray-500">
          {hackathon.description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <InfoBox label="Starts" value={formatDate(hackathon.start_date)} />
          <InfoBox
            label="Team Size"
            value={`${hackathon.min_team_size || 1}-${
              hackathon.max_team_size || 4
            }`}
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-6">
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

function formatDate(value) {
  if (!value) return "Not set";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
