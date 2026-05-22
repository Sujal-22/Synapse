import { Link } from "react-router-dom";
import Header from "../../components/layout/Header.jsx";
import { ROUTES } from "../../utils/Constants.js";
import teamImage1 from "../../assets/builder/sujal.jpeg";
import teamImage2 from "../../assets/builder/vedant.jpeg";
import teamImage3 from "../../assets/builder/prerna.jpeg";
import teamImage4 from "../../assets/builder/humesh.jpeg";
import instagramIcon from "../../assets/socialLogo/instagram.svg";
import githubIcon from "../../assets/socialLogo/github.svg";
import linkedinIcon from "../../assets/socialLogo/linkedin.svg";
import xIcon from "../../assets/socialLogo/X.svg";

const RECENT_HACKATHONS = [
  {
    id: "ai-impact-hack",
    title: "AI Impact Hack 2026",
    description:
      "Build AI-powered products that solve real-world problems and continue after the demo with Synapse AI guidance.",
    date: "Jun 01 - Jun 03, 2026",
    mode: "Online",
    status: "Applications open",
    tags: ["AI/ML", "Web Development", "Social Impact"],
    button: "View Hackathon",
    active: true,
    prize: "₹50,000",
    participants: 847,
  },
  {
    id: "web3-build-sprint",
    title: "Web3 Build Sprint",
    description:
      "Create blockchain, Web3, and decentralised applications with a team of complementary builders.",
    date: "Jun 10 - Jun 12, 2026",
    mode: "Online",
    status: "Applications open",
    tags: ["Blockchain", "Open Source", "DevTools"],
    button: "View Hackathon",
    active: true,
    prize: "₹75,000",
    participants: 523,
  },
  {
    id: "healthtech-innovation",
    title: "HealthTech Innovation Challenge",
    description:
      "Solve healthcare problems using software, AI, data, and user-focused product design.",
    date: "Jun 18 - Jun 20, 2026",
    mode: "Hybrid",
    status: "Coming soon",
    tags: ["HealthTech", "AI/ML", "Mobile"],
    button: "View Hackathon",
    active: false,
    prize: "₹60,000",
    participants: 214,
  },
];

const DEVELOPERS = [
  {
    name: "Sujal Kumar",
    role: "Full Stack Developer",
    image: teamImage1,
    skills: ["React", "Supabase", "Node.js"],
  },
  {
    name: "Vedant",
    role: "Data Analyst",
    image: teamImage2,
    skills: ["Python", "ML", "FastAPI"],
  },
  {
    name: "V Humesh",
    role: "Product Manager",
    image: teamImage4,
    skills: ["Figma", "Design", "Research"],
  },
  {
    name: "Prerna Raj",
    role: "Backend Developer",
    image: teamImage3,
    skills: ["Node.js", "API", "PostgreSQL"],
  },
];

const FEATURES = [
  {
    icon: "🧩",
    title: "Smart Team Formation",
    description:
      "Find teammates based on complementary skills instead of random matching.",
    accent: "from-indigo-500/10 to-blue-500/10",
  },
  {
    icon: "📦",
    title: "Project Submission",
    description:
      "Submit repo, demo, README, screenshots, and tech stack in one flow.",
    accent: "from-emerald-500/10 to-teal-500/10",
  },
  {
    icon: "🤖",
    title: "AI Post-Hackathon Report",
    description:
      "Generate roadmap, bug checklist, ownership plan, and commercialisation path.",
    accent: "from-violet-500/10 to-purple-500/10",
  },
];

export default function Home() {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden bg-white"
      style={{ fontFamily: "instrumment serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.06); }
        }
        @keyframes shimmer {
          0% { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes ping-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .glow-orb { animation: pulse-glow 4s ease-in-out infinite; }
        .float-el { animation: float-y 5s ease-in-out infinite; }
        .shimmer-text {
          background: linear-gradient(90deg, #fff 30%, #a5b4fc 50%, #fff 70%);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3.5s linear infinite;
        }
        .dot-ping { animation: ping-dot 1.4s ease-in-out infinite; }
        .fade-up { animation: fade-up 0.6s ease-out forwards; }
        .hack-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .hack-card:hover { transform: translateY(-6px); box-shadow: 0 24px 56px rgba(0,0,0,0.11); }
        .dev-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .dev-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.1); }
        .ticker-inner { animation: ticker 28s linear infinite; white-space: nowrap; }
        .feat-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .feat-card:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.07); }
      `}</style>

      <Header />

      {/* ── Hero ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #1e1b4b 35%, #312e81 65%, #1e3a8a 100%)",
        }}
      >
        {/* Ambient orbs */}
        <div
          className="glow-orb absolute -left-24 top-24 h-80 w-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)",
          }}
        />
        <div
          className="glow-orb absolute right-10 top-10 h-72 w-72 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.28) 0%, transparent 70%)",
            animationDelay: "2s",
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative mx-auto grid min-h-140 w-full max-w-340 grid-cols-1 items-center gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:px-10">
          {/* Left */}
          <div className="text-left">
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 ring-1 ring-white/15 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="dot-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              AI-powered hackathon platform
            </div>

            <h1 className="mt-6 text-1xl font-black tracking-tight leading-tight text-white sm:text-5xl">
              Build teams.
              <br />
              <span className="shimmer-text">Ship projects.</span>
              <br />
              Continue after
              <br />
              the demo.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-white/60">
              Synapse helps students explore hackathons, form balanced teams,
              submit projects, receive judging feedback, and generate an AI
              post-hackathon roadmap.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={ROUTES.EXPLORE}
                className="rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-gray-900 shadow-lg hover:bg-indigo-50 transition-colors"
              >
                Explore Hackathons →
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                Create Account
              </Link>
            </div>

            {/* Social proof */}
            <div
              className="mt-10 flex flex-wrap gap-6 text-xs text-white/40"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span>
                <span className="text-white/70 font-semibold">12,400+</span>{" "}
                builders
              </span>
              <span>
                <span className="text-white/70 font-semibold">₹1,25,000+</span>{" "}
                prizes
              </span>
              <span>
                <span className="text-white/70 font-semibold">38</span>{" "}
                hackathons hosted
              </span>
            </div>
          </div>

          {/* Right — Live preview panel */}
          <div className="float-el rounded-4xl bg-white/10 p-2 shadow-2xl ring-1 ring-white/15 backdrop-blur-sm">
            <div className="rounded-3xl bg-white p-6">
              <div className="flex items-center justify-between mb-1">
                <p
                  className="text-xs font-bold text-synapse-700 uppercase tracking-widest"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Live Platform Preview
                </p>
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  <span className="relative flex h-2 w-2">
                    <span className="dot-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Live
                </span>
              </div>

              <h2 className="mt-2 text-2xl font-black text-gray-900">
                Upcoming Hackathons
              </h2>

              <div className="mt-5 space-y-3">
                {RECENT_HACKATHONS.slice(0, 3).map((h) => (
                  <MiniHackathonCard key={h.id} hackathon={h} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ticker ── */}
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
              <span>⚡ Web3 Sprint · Applications open</span>
              <span>🏆 ₹1,25,000 total prize pool this season</span>
              <span>🚀 HealthTech Challenge dropping Jun 18</span>
              <span>👥 12,400+ builders on Synapse</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <section className="mx-auto w-full max-w-340 px-6 py-20 sm:px-8 lg:px-10">
        <div className="mb-10 text-center">
          <p
            className="text-xs font-bold tracking-widest uppercase text-indigo-500"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Platform Features
          </p>
          <h2 className="mt-3 text-4xl font-black text-gray-900 sm:text-5xl">
            Everything you need to ship.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </section>

      {/* ── Recent Hackathons ── */}
      <section className="w-full bg-gray-50">
        <div className="mx-auto w-full max-w-340 px-6 py-20 sm:px-8 lg:px-10">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest text-synapse-700"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Recent Hackathons
              </p>
              <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight text-gray-900 sm:text-3xl">
                Active events built for modern developers.
              </h2>
            </div>
            <Link
              to={ROUTES.EXPLORE}
              className="w-fit rounded-2xl bg-gray-900 px-6 py-3 text-sm font-bold text-white hover:bg-black transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {RECENT_HACKATHONS.map((h) => (
              <RecentHackathonCard key={h.id} hackathon={h} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Builder Spotlight ── */}
      <section className="mx-auto w-full max-w-340 px-3 py-10 sm:px-8 lg:px-10">
        <div className="mb-5">
          <p
            className="text-xs font-bold uppercase tracking-widest text-synapse-700"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Builder Spotlight
          </p>
          <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight text-gray-900 sm:text-3xl">
            Meet developers building with Synapse.
          </h2>
          <p className="mt-2 max-w-xl text-base leading-8 text-gray-500">
            Skilled participants, mentors, and builders with technical
            expertise.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {DEVELOPERS.map((d) => (
            <DeveloperCard key={d.name} developer={d} />
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #1e1b4b 40%, #1e3a8a 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="glow-orb absolute right-0 bottom-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-340 px-6 py-10 sm:px-8 lg:px-10 text-center text-white">
          <p
            className="text-xs font-bold tracking-widest uppercase text-indigo-400"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Ready to build?
          </p>
          <h2 className="mt-4 text-5xl font-black leading-tight sm:text-5xl">
            Launch your Hackathon
            <br />
            <span className="shimmer-text">Starts Here</span>
          </h2>
          <p className="mt-5 text-base pb-3 text-white/55  leading-10">
            Designed for organisers who want more than registrations — Synapse
            helps you build a thriving developer ecosystem.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to={ROUTES.HOST_HACKATHON}
              className="rounded-2xl bg-white px-8 py-4 text-sm font-bold text-gray-900 hover:bg-indigo-50 transition-colors shadow-lg"
            >
              Launch Hackathon →
            </Link>
            <Link
              to={ROUTES.EXPLORE}
              className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              Browse Hackathons
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ── Sub-components ── */

function MiniHackathonCard({ hackathon }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:bg-indigo-50/40">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-bold text-gray-900 truncate">
            {hackathon.title}
          </h3>
          <p
            className="mt-0.5 text-xs text-gray-400"
          >
            {hackathon.date}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {hackathon.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-gray-500 ring-1 ring-gray-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
            hackathon.active
              ? "bg-emerald-50 text-emerald-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {hackathon.status}
        </span>
      </div>
    </div>
  );
}

function FeatureCard({ feature }) {
  return (
    <div
      className={`feat-card rounded-3xl border border-gray-100 bg-white p-7 shadow-sm`}
    >
      <div
        className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${feature.accent} text-2xl mb-5`}
      >
        {feature.icon}
      </div>
      <h3 className="text-lg font-black text-gray-900">{feature.title}</h3>
      <p className="mt-2 text-sm leading-6 text-gray-500">
        {feature.description}
      </p>
    </div>
  );
}

function RecentHackathonCard({ hackathon }) {
  const fillPct = Math.min((hackathon.participants / 1000) * 100, 100);
  return (
    <article className="hack-card flex min-h-130 flex-col rounded-4xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Card top band */}
      <div
        className="relative h-28 p-5 text-white overflow-hidden"
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
        <div className="relative flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              hackathon.active
                ? "bg-emerald-400/20 text-emerald-200 ring-1 ring-emerald-300/30"
                : "bg-white/10 text-white/60 ring-1 ring-white/15"
            }`}
          >
            {hackathon.status}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/80 ring-1 ring-white/15">
            {hackathon.prize}
          </span>
        </div>
        <p
          className="relative mt-3 text-xs text-white/45"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {hackathon.participants.toLocaleString()} registered
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div>
          <h3 className="text-2xl font-black leading-tight tracking-tight text-gray-900">
            {hackathon.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            {hackathon.description}
          </p>
        </div>

        {/* Fill bar */}
        <div>
          <div className="mb-1.5 flex justify-between text-xs text-gray-400">
            <span>Spots filling</span>
            <span className="font-bold text-gray-700">
              {hackathon.participants}/1000
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-indigo-600"
              style={{
                width: `${fillPct}%`,
                transition: "width 1.2s cubic-bezier(.4,0,.2,1)",
              }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {hackathon.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto border-l-4 border-indigo-600 pl-4">
          <p
            className="text-xs font-bold uppercase tracking-widest text-gray-400"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {hackathon.date} · {hackathon.mode}
          </p>
        </div>

        <Link
          to={`/hackathon/${hackathon.id}`}
          className={`block rounded-2xl px-5 py-3.5 text-center text-sm font-bold transition-colors ${
            hackathon.active
              ? "bg-indigo-950 text-white hover:bg-indigo-900"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {hackathon.button}
        </Link>
      </div>
    </article>
  );
}

function DeveloperCard({ developer }) {
  return (
    <article className="dev-card overflow-hidden rounded-4xl border border-gray-100 bg-white shadow-sm">
      <div className="aspect-4/5 w-full overflow-hidden bg-gray-100">
        <img
          src={developer.image}
          alt={developer.name}
          className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-black text-gray-900">{developer.name}</h3>
        <p className="mt-0.5 text-sm font-semibold text-gray-400">
          {developer.role}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {developer.skills.map((s) => (
            <span
              key={s}
              className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <SocialButton label="Instagram" icon={instagramIcon} />
          <SocialButton label="X" icon={xIcon} />
          <SocialButton label="GitHub" icon={githubIcon} />
          <SocialButton label="LinkedIn" icon={linkedinIcon} />
        </div>
      </div>
    </article>
  );
}

function SocialButton({ label, icon }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-indigo-100"
    >
      <img src={icon} alt={label} className="h-5 w-5 object-contain" />
    </button>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto  max-w-350 px-6 py-16 sm:px-8 lg:px-10">
        {/* Top row */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <Link
              to={ROUTES.HOME}
              className="text-5xl font-black text-synapse-700"
            >
              Synapse
            </Link>
            <p className="mt-3 text-sm leading-normal text-gray-500">
              The AI-powered hackathon platform for students and builders.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <FooterSocial label="X" icon={xIcon} />
              <FooterSocial label="Instagram" icon={instagramIcon} />
              <FooterSocial label="GitHub" icon={githubIcon} />
              <FooterSocial label="LinkedIn" icon={linkedinIcon} />
            </div>
          </div>

          {/* Nav links */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            <FooterLink label="Explore" to={ROUTES.EXPLORE} />
            <FooterLink label="About" to="#" />
            <FooterLink label="Support" to="#" />
            <FooterLink label="Terms" to="#" />
            <FooterLink label="Privacy" to="#" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-gray-100 pt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-400">
            © 2026 Synapse Hackathon Ecosystem. All rights reserved.
          </p>
          <p
            className="text-xs text-gray-300"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            v1.0.0 · Built for builders
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ label, to }) {
  return (
    <Link
      to={to}
      className="text-sm font-bold text-gray-700 hover:text-synapse-700 transition-colors"
    >
      {label}
    </Link>
  );
}

function FooterSocial({ label, icon }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-indigo-100"
    >
      <img src={icon} alt={label} className="h-5 w-5 object-contain" />
    </button>
  );
}
