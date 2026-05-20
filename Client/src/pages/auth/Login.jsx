import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { ROUTES } from "../../utils/constants";
import logo from "../../assets/synapseLogo/synapseLogo.png";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { signIn, signInWithGoogle, signInWithGithub } = useAuth();

  const redirectTo = location.state?.redirectTo || ROUTES.DASHBOARD;

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (error) setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!form.password) {
      setError("Password is required.");
      return;
    }

    setLoading(true);
    setError("");

    const result = await signIn({
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    navigate(redirectTo, { replace: true });
  }

  async function handleOAuth(provider) {
    setOauthLoading(provider);
    setError("");

    if (provider === "google") {
      await signInWithGoogle();
    }

    if (provider === "github") {
      await signInWithGithub();
    }

    setOauthLoading(null);
  }

  return (
    <main className="min-h-screen w-full bg-linear-to-br from-slate-50 via-white to-synapse-50 px-4 py-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl overflow-hidden rounded-4xl bg-white shadow-2xl ring-1 ring-black/5 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left visual panel */}
        <section className="relative hidden overflow-hidden bg-linear-to-br from-indigo-950 via-synapse-800 to-blue-900 lg:block">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl" />
          </div>

          <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
            <Link to={ROUTES.HOME} className="flex items-center">
              <img
                src={logo}
                alt="Synapse Logo"
                className="h-14 w-auto object-contain"
              />
            </Link>

            <div>
              <p className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white/70 ring-1 ring-white/10">
                Welcome back, builder
              </p>

              <h1 className="max-w-xl text-6xl font-black leading-tight tracking-tight">
                Explore.
                <br />
                Build.
                <br />
                Continue.
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-white/65">
                Login to manage hackathons, form teams, submit projects, and
                generate AI-powered post-hackathon roadmaps.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <AuthStat value="AI" label="Reports" />
              <AuthStat value="Team" label="Matching" />
              <AuthStat value="Live" label="Events" />
            </div>
          </div>
        </section>

        {/* Right form panel */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-14">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <Link
                to={ROUTES.HOME}
                className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-900 text-xl font-black text-white lg:hidden"
              >
                S
              </Link>

              <p className="text-sm font-black uppercase tracking-[0.2em] text-synapse-700">
                Login
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-gray-900">
                Welcome Back
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Enter your email and password to access your Synapse account.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-bold text-gray-700">
                    Password
                  </label>

                  <Link
                    to={ROUTES.FORGOT_PASSWORD}
                    className="text-sm font-bold text-synapse-700 hover:text-synapse-900"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3.5 pr-14 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-gray-500">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-synapse-700 focus:ring-synapse-600"
                  />
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-2xl bg-gray-900 px-5 py-3.5 text-sm font-black text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-100" />
              <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-gray-100" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleOAuth("google")}
                disabled={oauthLoading === "google"}
                className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
              >
                {oauthLoading === "google" ? "Loading..." : "Google"}
              </button>

              <button
                type="button"
                onClick={() => handleOAuth("github")}
                disabled={oauthLoading === "github"}
                className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
              >
                {oauthLoading === "github" ? "Loading..." : "GitHub"}
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                to={ROUTES.REGISTER}
                className="font-black text-gray-900 hover:text-synapse-700"
              >
                Sign up
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function AuthStat({ value, label }) {
  return (
    <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-white/50">
        {label}
      </p>
    </div>
  );
}
