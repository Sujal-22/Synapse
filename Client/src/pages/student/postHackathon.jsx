import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

const REPORT_SECTIONS = [
  {
    title: "Project Summary",
    desc: "A clear overview of your submitted prototype, target users, core problem, and solution direction.",
    icon: "📌",
  },
  {
    title: "Bug-Fix Checklist",
    desc: "Prioritised technical fixes grouped by critical, medium, and low severity.",
    icon: "🐛",
  },
  {
    title: "7-Day Cleanup Roadmap",
    desc: "Immediate actions to stabilise the codebase, clean UI, and improve demo readiness.",
    icon: "🗓",
  },
  {
    title: "30-Day MVP Plan",
    desc: "A practical product roadmap to move from hackathon prototype to usable MVP.",
    icon: "🚀",
  },
  {
    title: "Team Ownership Plan",
    desc: "Suggested responsibility split across frontend, backend, AI, design, and deployment.",
    icon: "👥",
  },
  {
    title: "Commercialisation Path",
    desc: "Startup, open-source, freelance, or portfolio direction based on project potential.",
    icon: "💼",
  },
];

const ROADMAP_STEPS = [
  "Submit project repository, README, demo link, and tech stack.",
  "Synapse AI analyses your project structure and product direction.",
  "Receive roadmap, bugs, ownership plan, and growth strategy.",
];

export default function PostHackathon() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gray-50"
    style={{fontFamily:"instrument serif"}}>
      {/* Hero */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto grid w-full max-w-400 gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-20">
          <div>
            <p
              className="inline-flex rounded-full bg-synapse-50 px-4 py-2 text-sm font-bold uppercase tracking-widest text-synapse-700"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              AI Post-Hackathon
            </p>

            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight tracking-tight text-gray-900 lg:text-6xl">
              Continue building after the demo.
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-500">
              Synapse turns your hackathon submission into an actionable product
              roadmap with bug fixes, team ownership, MVP planning, and
              commercialisation guidance.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={
                  ROUTES.SUBMISSION?.replace(":hackathonId", "demo") ||
                  "/submission/demo"
                }
                className="rounded-2xl bg-gray-900 px-6 py-3.5 text-sm font-black text-white transition hover:bg-black"
              >
                Submit Project
              </Link>

              <Link
                to={ROUTES.EXPLORE}
                className="rounded-2xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-black text-gray-700 transition hover:bg-gray-50"
              >
                Explore Hackathons
              </Link>
            </div>
          </div>

          <div className="rounded-4xl bg-linear-to-br from-indigo-950 via-synapse-800 to-blue-900 p-8 text-white shadow-xl">
            <p className="text-sm font-bold uppercase tracking-widest text-white/50">
              AI Report Preview
            </p>

            <div className="mt-6 space-y-4">
              <PreviewRow
                label="Stack Analysis"
                value="React • Supabase • Node"
              />
              <PreviewRow label="Bug Priority" value="12 checks detected" />
              <PreviewRow label="MVP Timeline" value="30 days" />
              <PreviewRow label="Product Path" value="Startup / Open Source" />
            </div>

            <div className="mt-8 rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
              <p className="text-sm font-semibold text-white/70">
                The goal is simple: your prototype should not die after judging.
                Synapse helps you decide what to fix, build, assign, and launch
                next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Report Sections */}
      <section className="mx-auto w-full max-w-400 px-6 py-14 sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-synapse-700">
              What Synapse Generates
            </p>
            <h2 className="mt-3 text-4xl font-black text-gray-900">
              A full post-hackathon action report
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-gray-500">
            Designed for builders who want to convert hackathon energy into a
            polished project, startup prototype, open-source tool, or portfolio
            case study.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {REPORT_SECTIONS.map((item) => (
            <ReportCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="border-y border-gray-100 bg-white">
        <div className="mx-auto grid w-full max-w-400 gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-synapse-700">
              Workflow
            </p>

            <h2 className="mt-3 text-4xl font-black text-gray-900">
              From submission to product direction
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-500">
              Once the project is submitted, the AI agent reads the repo link,
              README, description, and tech stack to generate a structured
              improvement plan.
            </p>
          </div>

          <div className="space-y-4">
            {ROADMAP_STEPS.map((step, index) => (
              <div
                key={step}
                className="flex gap-4 rounded-4xl border border-gray-100 bg-gray-50 p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-900 text-sm font-black text-white">
                  {index + 1}
                </div>

                <div>
                  <h3 className="text-lg font-black text-gray-900">
                    Step {index + 1}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-gray-500">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-400 px-6 py-14 sm:px-8 lg:px-10">
        <div className="rounded-4xl bg-gray-900 p-8 text-white shadow-xl lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-300">
                Ready after demo?
              </p>
              <h2 className="mt-3 text-4xl font-black">
                Generate a roadmap before your project loses momentum.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/60">
                Convert your hackathon output into a structured plan your team
                can execute after the event.
              </p>
            </div>

            <Link
              to={
                ROUTES.SUBMISSION?.replace(":hackathonId", "demo") ||
                "/submission/demo"
              }
              className="rounded-2xl bg-white px-6 py-4 text-center text-sm font-black text-gray-900 transition hover:bg-indigo-50"
            >
              Start Submission
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ReportCard({ title, desc, icon }) {
  return (
    <article className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-synapse-50 text-xl">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-black text-gray-900">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-gray-500">{desc}</p>
    </article>
  );
}

function PreviewRow({ label, value }) {
  return (
    <div className="rounded-3xl bg-white/10 p-4 ring-1 ring-white/10">
      <p className="text-xs font-black uppercase tracking-wide text-white/40">
        {label}
      </p>
      <p className="mt-1 text-sm font-black text-white">{value}</p>
    </div>
  );
}
