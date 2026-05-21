import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth.jsx";
import { ROUTES, DOMAIN_OPTIONS } from "../../utils/Constants.js";
import { createHackathon } from "../../services/hackathonService.js";

export default function CreateHackathon() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    theme: "",
    mode: "Online",
    start_date: "",
    end_date: "",
    registration_deadline: "",
    min_team_size: 1,
    max_team_size: 4,
    prize_pool: "",
    tags: [],
  });

  function setField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (error) setError("");
  }

  function toggleTag(tag) {
    setForm((prev) => {
      const exists = prev.tags.includes(tag);

      return {
        ...prev,
        tags: exists
          ? prev.tags.filter((item) => item !== tag)
          : [...prev.tags, tag],
      };
    });
  }

  function validateForm() {
    if (!form.title.trim()) return "Hackathon title is required.";
    if (!form.description.trim()) return "Description is required.";
    if (!form.start_date) return "Start date is required.";
    if (!form.end_date) return "End date is required.";
    if (!form.registration_deadline)
      return "Registration deadline is required.";
    if (form.tags.length === 0) return "Select at least one domain/tag.";
    if (Number(form.min_team_size) > Number(form.max_team_size)) {
      return "Minimum team size cannot be greater than maximum team size.";
    }

    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user?.id) {
      navigate(ROUTES.LOGIN, {
        state: { redirectTo: ROUTES.ORG_CREATE },
      });
      return;
    }

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    const result = await createHackathon({
      organiser_id: user.id,
      title: form.title,
      description: form.description,
      theme: form.theme,
      mode: form.mode,
      status: "upcoming",
      start_date: form.start_date,
      end_date: form.end_date,
      registration_deadline: form.registration_deadline,
      min_team_size: Number(form.min_team_size),
      max_team_size: Number(form.max_team_size),
      prize_pool: form.prize_pool,
      tags: form.tags,
    });

    setLoading(false);

    if (result.error) {
      setError(result.error.message || "Could not create hackathon.");
      return;
    }

    navigate(ROUTES.EXPLORE, { replace: true });
  }

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto w-full max-w-375 px-4 py-10 sm:px-5 lg:px-6">
          <div className="rounded-4xl bg-linear-to-br from-indigo-950 via-synapse-800 to-blue-900 p-8 text-white shadow-xl">
            <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white/80 ring-1 ring-white/10">
              Launch Hackathon
            </p>

            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight">
              Create a hackathon students can apply for.
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-white/70">
              Publish your event, set registration deadline, define team size,
              add tags, and allow students to register through Synapse.
            </p>

            <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm font-semibold text-white/70 ring-1 ring-white/10">
              Organiser:{" "}
              {profile?.full_name || profile?.username || "Current user"}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-375 px-4 py-10 sm:px-5 lg:px-6">
        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]"
        >
          <div className="space-y-8">
            <section className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black text-gray-900">
                Basic Details
              </h2>

              {error && (
                <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {error}
                </div>
              )}

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <Field
                  label="Hackathon Title"
                  value={form.title}
                  onChange={(value) => setField("title", value)}
                  placeholder="e.g. AI Impact Hack 2026"
                />

                <Field
                  label="Theme"
                  value={form.theme}
                  onChange={(value) => setField("theme", value)}
                  placeholder="e.g. AI for Social Good"
                />

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Description
                  </label>

                  <textarea
                    value={form.description}
                    onChange={(e) => setField("description", e.target.value)}
                    rows={5}
                    placeholder="Describe the hackathon, problem statement, rules, and expected outcome..."
                    className="w-full resize-none rounded-2xl border border-gray-200 px-5 py-3.5 text-sm outline-none focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Mode
                  </label>

                  <select
                    value={form.mode}
                    onChange={(e) => setField("mode", e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 px-5 py-3.5 text-sm outline-none focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50"
                  >
                    <option>Online</option>
                    <option>Offline</option>
                    <option>Hybrid</option>
                  </select>
                </div>

                <Field
                  label="Prize Pool"
                  value={form.prize_pool}
                  onChange={(value) => setField("prize_pool", value)}
                  placeholder="e.g. ₹50,000"
                />
              </div>
            </section>

            <section className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black text-gray-900">
                Dates and Team Rules
              </h2>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <Field
                  type="date"
                  label="Registration Deadline"
                  value={form.registration_deadline}
                  onChange={(value) => setField("registration_deadline", value)}
                />

                <Field
                  type="date"
                  label="Start Date"
                  value={form.start_date}
                  onChange={(value) => setField("start_date", value)}
                />

                <Field
                  type="date"
                  label="End Date"
                  value={form.end_date}
                  onChange={(value) => setField("end_date", value)}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Field
                    type="number"
                    label="Min Team"
                    value={form.min_team_size}
                    onChange={(value) => setField("min_team_size", value)}
                  />

                  <Field
                    type="number"
                    label="Max Team"
                    value={form.max_team_size}
                    onChange={(value) => setField("max_team_size", value)}
                  />
                </div>
              </div>
            </section>

            <section className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black text-gray-900">
                Domains / Tags
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Select domains so students can discover your hackathon.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {DOMAIN_OPTIONS.map((tag) => {
                  const selected = form.tags.includes(tag);

                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`rounded-full px-4 py-2 text-xs font-black transition ${
                        selected
                          ? "bg-synapse-700 text-white"
                          : "bg-synapse-50 text-synapse-700 hover:bg-synapse-100"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-gray-900">
                Publish Summary
              </h2>

              <div className="mt-5 space-y-4">
                <Summary label="Title" value={form.title || "Not added"} />
                <Summary label="Mode" value={form.mode} />
                <Summary
                  label="Team Size"
                  value={`${form.min_team_size}-${form.max_team_size}`}
                />
                <Summary
                  label="Tags"
                  value={
                    form.tags.length ? form.tags.join(", ") : "Not selected"
                  }
                />
              </div>
            </section>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-synapse-700 px-5 py-4 text-sm font-black text-white shadow-lg shadow-synapse-200 hover:bg-synapse-800 disabled:opacity-60"
            >
              {loading ? "Launching..." : "Launch Hackathon"}
            </button>
          </aside>
        </form>
      </section>
    </main>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-gray-200 px-5 py-3.5 text-sm outline-none placeholder:text-gray-400 focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50"
      />
    </div>
  );
}

function Summary({ label, value }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">
      <p className="text-xs font-black uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-black text-gray-900">{value}</p>
    </div>
  );
}
