import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { ROUTES } from "../../utils/Constants";
import {
  checkRegistration,
  registerForHackathon,
} from "../../services/hackathonService";
import { useEffect, useState } from "react";

export default function HackathonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function verifyRegistration() {
      if (!user?.id || !id) return;

      const result = await checkRegistration(id, user.id);

      if (!result.error) {
        setRegistered(result.data);
      }
    }

    verifyRegistration();
  }, [user?.id, id]);

  async function handleRegister() {
    if (!user) {
      navigate(ROUTES.LOGIN, {
        state: {
          redirectTo: `/hackathon/${id}`,
        },
      });
      return;
    }

    setLoading(true);

    const result = await registerForHackathon(id, user.id);

    setLoading(false);

    if (!result.error) {
      setRegistered(true);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-linear-to-br from-indigo-950 via-synapse-700 to-blue-800 px-4 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <Link to={ROUTES.EXPLORE} className="text-sm text-white/70">
            ← Back to Explore
          </Link>

          <p className="mt-8 text-xs font-bold uppercase tracking-wide text-white/60">
            Upcoming Hackathon
          </p>

          <h1 className="mt-2 text-5xl font-extrabold">AI Impact Hack</h1>

          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Build AI solutions for real-world problems and continue your
            prototype after the event with Synapse AI guidance.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold text-gray-900">
              About this hackathon
            </h2>

            <p className="mt-4 leading-7 text-gray-500">
              Participate with your team, submit your prototype, receive judging
              feedback, and generate an AI-powered post-hackathon roadmap.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["AI/ML", "Web Development", "Social Impact"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-synapse-50 px-4 py-2 text-sm font-semibold text-synapse-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-extrabold text-gray-900">
              Join this hackathon
            </h3>

            <div className="mt-6 space-y-4 text-sm">
              <Info label="Prize Pool" value="₹50,000" />
              <Info label="Team Size" value="2–4 Members" />
              <Info label="Mode" value="Online" />
            </div>

            <button
              type="button"
              onClick={handleRegister}
              disabled={loading || registered}
              className="mt-8 w-full rounded-2xl bg-gray-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {registered
                ? "Already Registered"
                : loading
                  ? "Registering..."
                  : "Register for Hackathon"}
            </button>

            {!user && (
              <p className="mt-3 text-center text-xs text-gray-400">
                Login is required before registration.
              </p>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
      <span className="text-gray-500">{label}</span>
      <span className="font-bold text-gray-900">{value}</span>
    </div>
  );
}
