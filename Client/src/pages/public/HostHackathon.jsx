import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/Constants";

export default function HostHackathon() {
  return (
    <main className="min-h-screen w-full bg-gray-50">
      <section className="mx-auto w-full max-w-375 px-4 py-16 sm:px-5 lg:px-6">
        <div className="rounded-4xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-synapse-700">
                Ready to publish?
              </p>

              <h2 className="mt-3 text-4xl font-black text-gray-900">
                Launch your hackathon and start accepting student registrations.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-500">
                Create your hackathon listing, define event dates, set team
                size, add domains, publish prize details, and let students apply
                from the Explore page.
              </p>
            </div>

            <Link
              to={ROUTES.ORG_CREATE}
              className="rounded-2xl bg-synapse-700 px-6 py-4 text-center text-sm font-black text-white shadow-lg shadow-synapse-200 hover:bg-synapse-800"
            >
              Launch Hackathon
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-375 px-4 py-16 sm:px-5 lg:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            title="Event Management"
            description="Create hackathon listings, add dates, set team size, publish rules, and manage registrations."
          />
          <FeatureCard
            title="Team & Submission Flow"
            description="Track registered users, team formation, project submissions, repositories, demos, and README links."
          />
          <FeatureCard
            title="Judging & AI Reports"
            description="Support structured judging and generate AI-powered post-hackathon roadmaps for submitted projects."
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-375 px-4 pb-20 sm:px-5 lg:px-6">
        <div className="rounded-4xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-black text-gray-900">
            Why host on Synapse?
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Point text="Centralized dashboard for organisers." />
            <Point text="Public hackathon discovery for participants." />
            <Point text="AI-based post-hackathon guidance for teams." />
            <Point text="Structured judging and score management." />
            <Point text="Registration, team, and submission tracking." />
            <Point text="Designed for colleges, tech clubs, and communities." />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="rounded-4xl border border-gray-100 bg-white p-7 shadow-sm">
      <h3 className="text-xl font-black text-gray-900">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-gray-500">{description}</p>
    </div>
  );
}

function Point({ text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-synapse-700 text-sm font-black text-white">
        ✓
      </span>
      <p className="text-sm font-bold text-gray-700">{text}</p>
    </div>
  );
}
