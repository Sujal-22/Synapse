import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/Constants";
import { useAuth } from "../../context/useAuth";


export default function Dashboard() {
  const { profile } = useAuth();
  const displayName = profile?.full_name || profile?.username || "Builder";

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
      participants: 847,
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
      participants: 523,
    },
  ];

  const stats = { hackathons: 3, projects: 1, wins: 0 };

  const activities = [
    { text: "Priya joined AI Impact Hack", time: "2m ago", type: "join" },
    { text: "Team Nexus submitted a project", time: "1h ago", type: "submit" },
    { text: "Web3 Sprint registration opened", time: "3h ago", type: "open" },
    { text: 'You earned "Early Bird" badge', time: "1d ago", type: "badge" },
  ];

  return (
    <main
      className="min-h-screen w-full bg-gray-50"
      style={{ fontFamily: "insturment Serif" }}
    >
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.65; transform: scale(1.06); }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes shimmer {
          0% { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
        @keyframes ping-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .glow-orb { animation: pulse-glow 4s ease-in-out infinite; }
        .ticker-inner { animation: ticker 28s linear infinite; white-space: nowrap; }
        .shimmer-text {
          background: linear-gradient(90deg, #fff 30%, #a5b4fc 50%, #fff 70%);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3.5s linear infinite;
        }
        .activity-item { animation: slide-in 0.4s ease-out forwards; }
        .hack-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .hack-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.12); }
        .hack-card:hover .card-shine { opacity: 1; }
        .card-shine { transition: opacity 0.3s; }
        .progress-fill { transition: width 1.2s cubic-bezier(.4,0,.2,1); }
        .stat-card { animation: fade-up 0.5s ease-out forwards; }
        .dot-ping { animation: ping-dot 1.4s ease-in-out infinite; }
      `}</style>

      {/* Live ticker strip */}
      <div
        className="overflow-hidden border-b border-indigo-900 py-2"
        style={{ background: "#0f0c29" }}
      >
        <div
          className="ticker-inner inline-flex gap-20 text-xs text-indigo-400"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {[...Array(2)].map((_, i) => (
            <span key={i} className="inline-flex gap-20">
              <span>🔴 LIVE · AI Impact Hack · 847 registered</span>
              <span>⚡ Web3 Build Sprint · Reg open now</span>
              <span>🏆 ₹1,25,000 total prize pool this season</span>
              <span>🚀 Climate Tech Challenge dropping soon</span>
              <span>👥 12,400+ builders on Synapse</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="border-b border-gray-100 bg-white overflow-visible">
        <div className="mx-auto w-full max-w-340 px-6 py-16 sm:px-8 lg:px-10">
          <div
            className="relative rounded-4xl overflow-hidden p-10 text-white shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, #0f0c29 0%, #1e1b4b 35%, #312e81 65%, #1e3a8a 100%)",
            }}
          >
            {/* Ambient orbs */}
            <div
              className="glow-orb absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)",
              }}
            />
            <div
              className="glow-orb absolute -bottom-16 left-1/3 w-72 h-72 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(59,130,246,0.28) 0%, transparent 70%)",
                animationDelay: "2s",
              }}
            />
            {/* Dot-grid pattern */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-start">
              {/* Left */}
              <div className="flex-1">
                {/* Status badge */}
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/80 ring-1 ring-white/15 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="dot-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Active Builder
                </div>

                <h1 className="mt-5 text-5xl font-black tracking-tight leading-tight">
                  <span className="shimmer-text">Hello,</span>
                  <br />
                  <span className="text-white">{displayName} 👾</span>
                </h1>
                <p className="mt-4 text-base text-white/55 max-w-md leading-7">
                  Your hackathon command center. Track submissions, find teams,
                  and ship your next big thing.
                </p>

                {/* CTA row */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to={ROUTES.EXPLORE}
                    className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-gray-900 hover:bg-indigo-50 transition-colors"
                  >
                    Browse Hackathons →
                  </Link>
                  <Link
                    to={ROUTES.TEAMS}
                    className="rounded-2xl bg-white/10 px-6 py-3 text-sm font-bold text-white ring-1 ring-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm"
                  >
                    Find a Team
                  </Link>
                </div>

                {/* Meta bar */}
                <div
                  className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-6 text-xs text-white/40"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <span>
                    RANK{" "}
                    <span className="text-white/70 font-semibold">#1,204</span>
                  </span>
                  <span>
                    XP{" "}
                    <span className="text-white/70 font-semibold">340 pts</span>
                  </span>
                  <span>
                    STREAK{" "}
                    <span className="text-white/70 font-semibold">
                      7 days 🔥
                    </span>
                  </span>
                  <span>
                    NEXT BADGE{" "}
                    <span className="text-white/70 font-semibold">
                      250 XP away
                    </span>
                  </span>
                </div>
              </div>

              {/* Right — stat cards */}
              <div className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:min-w-52">
                <HeroStat
                  label="Hackathons"
                  value={stats.hackathons}
                  icon="⚡"
                  delay={0}
                />
                <HeroStat
                  label="Projects"
                  value={stats.projects}
                  icon="🛠"
                  delay={80}
                />
                <HeroStat
                  label="Wins"
                  value={stats.wins}
                  icon="🏆"
                  delay={160}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Upcoming Hackathons ── */}
      <section className="mx-auto w-full max-w-340 px-6 py-16 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="overflow-visible">
            <p
              className="text-xs font-bold tracking-widest uppercase text-indigo-500"
              style={{ fontFamily: "instrument Serif" }}
            >
              Open Now
            </p>
            <h2 className="mt-1 text-3xl font-black text-gray-800 leading-normal pb-1" style={{ fontFamily: "instument Serif" }}>
              Upcoming Hackathons
            </h2>
            <p className="mt-4 text-sm text-gray-500">
              Discover challenges aligned with your skills.
            </p>
          </div>
          <Link
            to={ROUTES.EXPLORE}
            className="ml-auto h-fit rounded-2xl bg-gray-900 px-6 py-3 text-sm font-bold text-white hover:bg-black transition-colors"
          >
            Explore All →
          </Link>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {hackathons.map((hack) => (
            <HackathonCard key={hack.id} hackathon={hack} />
          ))}
          <TeaserCard />
        </div>
      </section>

      {/* ── Activity + Teams ── */}
      <section className="mx-auto w-full max-w-340 px-6 pb-16 sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Live Activity */}
          <div className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-black text-gray-900">
                Live Activity
              </h3>
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <span className="relative flex h-2 w-2">
                  <span className="dot-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Live
              </span>
            </div>
            <div className="space-y-4">
              {activities.map((a, i) => (
                <ActivityItem key={i} activity={a} delay={i * 80} />
              ))}
            </div>
          </div>

          {/* My Teams */}
          <div className="lg:col-span-2 rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-black text-gray-900">My Teams</h3>
                <p className="mt-0.5 text-sm text-gray-500">
                  Collaborate and track ongoing projects.
                </p>
              </div>
              <Link
                to={ROUTES.TEAMS}
                className="rounded-2xl bg-indigo-950 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-900 transition-colors"
              >
                Find Team
              </Link>
            </div>
            <EmptyTeams />
          </div>
        </div>
      </section>

      {/* ── AI CTA ── */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 0px, transparent 28px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="glow-orb absolute right-0 top-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-340 px-6 py-16 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p
                className="text-xs font-bold tracking-widest uppercase text-indigo-400"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                AI Post-Hackathon
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight">
                Turn prototype
                <br />
                <span style={{ color: "#818cf8" }}>into product</span>
              </h2>
              <p className="mt-4 text-base leading-7 text-white/60">
                Synapse AI generates personalised bug-fix checklists and 30-day
                roadmaps tailored to your stack.
              </p>
              <Link to={ROUTES.POST_HACKATHON} className="mt-5 flex w-fit rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-500 transition-colors">
                Generate My Roadmap →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { text: "Bug-fix checklist", icon: "🐛" },
                { text: "7-day cleanup roadmap", icon: "🗓" },
                { text: "30-day MVP plan", icon: "🚀" },
                { text: "Ownership plan", icon: "👑" },
              ].map((item) => (
                <GuidanceItem key={item.text} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── Sub-components ── */

function HeroStat({ label, value, icon, delay }) {
  return (
    <div
      className="stat-card rounded-2xl bg-white/10 p-4 ring-1 ring-white/12 backdrop-blur-sm"
      style={{ animationDelay: `${delay}ms`, opacity: 0 }}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <p className="text-2xl font-black">{value}</p>
      </div>
      <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/55">
        {label}
      </p>
    </div>
  );
}

function HackathonCard({ hackathon }) {
  const fillPct = Math.min((hackathon.participants / 1000) * 100, 100);
  return (
    <article className="hack-card relative flex flex-col overflow-hidden rounded-4xl border border-gray-100 bg-white shadow-sm">
      {/* Hover shine */}
      <div
        className="card-shine absolute inset-0 rounded-4xl pointer-events-none opacity-0"
        style={{ boxShadow: "0 0 48px rgba(99,102,241,0.14)" }}
      />

      {/* Card header */}
      <div
        className="relative h-44 overflow-hidden p-5 text-white"
        style={{
          background:
            "linear-gradient(135deg, #1e1b4b 0%, #312e81 55%, #1e3a8a 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="relative flex items-start justify-between">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white/80 ring-1 ring-white/15">
            {hackathon.status}
          </span>
          {hackathon.prize && (
            <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold text-emerald-200 ring-1 ring-emerald-300/30">
              {hackathon.prize}
            </span>
          )}
        </div>
        <h3 className="relative mt-7 text-xl font-black leading-tight">
          {hackathon.title}
        </h3>
        <p
          className="relative mt-1 text-xs text-white/45"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {hackathon.participants.toLocaleString()} registered
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Registration fill */}
        <div>
          <div className="mb-1.5 flex justify-between text-xs text-gray-400">
            <span>Spots filling</span>
            <span className="font-bold text-gray-700">
              {hackathon.participants}/1000
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className="progress-fill h-full rounded-full bg-indigo-600"
              style={{ width: `${fillPct}%` }}
            />
          </div>
        </div>

        <p className="text-sm leading-6 text-gray-600">
          {hackathon.description}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
          <div className="rounded-xl bg-gray-50 px-3 py-2">
            <p className="mb-0.5 font-normal text-gray-400">Starts</p>
            {hackathon.startDate}
          </div>
          <div className="rounded-xl bg-gray-50 px-3 py-2">
            <p className="mb-0.5 font-normal text-gray-400">Team size</p>
            {hackathon.teamSize}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {hackathon.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2">
          <Link
            to={`/hackathon/${hackathon.id}`}
            className="flex-1 rounded-2xl bg-indigo-950 px-4 py-3 text-center text-sm font-bold text-white hover:bg-indigo-900 transition-colors"
          >
            View Details
          </Link>
          <Link
            to={`/hackathon/${hackathon.id}`}
            className="rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </article>
  );
}

function TeaserCard() {
  return (
    <article className="group flex flex-col items-center justify-center rounded-4xl border-2 border-dashed border-gray-200 bg-gray-50 p-10 text-center transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50/40">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-2xl transition-transform duration-300 group-hover:scale-110">
        🚀
      </div>
      <p className="font-black text-gray-700">More Coming Soon</p>
      <p className="mt-1 text-sm text-gray-400">
        Climate Tech, HealthAI & more
      </p>
      <Link
        to={ROUTES.EXPLORE}
        className="mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        Get Notified →
      </Link>
    </article>
  );
}

function ActivityItem({ activity, delay }) {
  const icons = { join: "👤", submit: "📦", open: "🟢", badge: "🏅" };
  return (
    <div
      className="activity-item flex items-start gap-3"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="mt-0.5 shrink-0 text-base">
        {icons[activity.type]}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium leading-5 text-gray-700">
          {activity.text}
        </p>
        <p
          className="mt-0.5 text-xs text-gray-400"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {activity.time}
        </p>
      </div>
    </div>
  );
}

function EmptyTeams() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50 py-14 text-center">
      <div className="mb-3 text-4xl">👥</div>
      <p className="font-black text-gray-700">No team yet</p>
      <p className="mt-1 max-w-xs text-sm text-gray-400">
        Join or create a team to collaborate and ship faster together.
      </p>
      <Link
        to={ROUTES.TEAMS}
        className="mt-5 rounded-2xl bg-gray-900 px-6 py-3 text-sm font-bold text-white hover:bg-black transition-colors"
      >
        Find a Team →
      </Link>
    </div>
  );
}

function GuidanceItem({ text, icon }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/8 px-4 py-4 ring-1 ring-white/10 hover:bg-white/12 transition-colors">
      <span className="text-xl">{icon}</span>
      <p className="text-sm font-semibold text-white/80">{text}</p>
    </div>
  );
}
