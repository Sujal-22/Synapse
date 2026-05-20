import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { ROUTES, SKILL_OPTIONS, DOMAIN_OPTIONS } from "../../utils/constants";
import useDebounce from "../../hooks/useDebounce";
import {
  checkUsernameAvailability,
  normalizeUsername,
  validateUsername,
} from "../../services/profileService";
import logo from "../../assets/synapseLogo/synapseLogo.png";

const STEPS = ["Account", "Profile", "Skills"];

const YEAR_OPTIONS = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
  { value: "5", label: "5th Year / PG" },
  { value: "0", label: "Alumni / Other" },
];

const ROLE_OPTIONS = [
  {
    value: "participant",
    label: "Participant",
    desc: "Join hackathons, build projects, and find teammates.",
  },
  {
    value: "organiser",
    label: "Organiser",
    desc: "Create and manage hackathon events.",
  },
  {
    value: "mentor",
    label: "Mentor",
    desc: "Guide teams during events.",
  },
];

export default function Register() {
  const navigate = useNavigate();
  const { signUp, signInWithGithub, signInWithGoogle } = useAuth();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "participant",
    college: "",
    yearOfStudy: "",
    mobile: "",
    skills: [],
    domains: [],
  });

  const [usernameStatus, setUsernameStatus] = useState({
    checking: false,
    available: null,
    message: "",
  });

  const debouncedUsername = useDebounce(form.username, 500);

  useEffect(() => {
    let cancelled = false;

    async function verifyUsername() {
      const username = normalizeUsername(debouncedUsername);

      if (!username) {
        setUsernameStatus({
          checking: false,
          available: null,
          message: "",
        });
        return;
      }

      const validationError = validateUsername(username);

      if (validationError) {
        setUsernameStatus({
          checking: false,
          available: false,
          message: validationError,
        });
        return;
      }

      setUsernameStatus({
        checking: true,
        available: null,
        message: "Checking username...",
      });

      const result = await checkUsernameAvailability(username);

      if (cancelled) return;

      setUsernameStatus({
        checking: false,
        available: result.available,
        message: result.available
          ? `@${username} is available.`
          : result.error || `@${username} is already taken.`,
      });
    }

    verifyUsername();

    return () => {
      cancelled = true;
    };
  }, [debouncedUsername]);

  function setField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    if (serverError) {
      setServerError("");
    }
  }

  function handleChange(e) {
    setField(e.target.name, e.target.value);
  }

  function validateStep1() {
    const formErrors = {};

    if (!form.fullName.trim()) {
      formErrors.fullName = "Full name is required.";
    }

    const usernameError = validateUsername(form.username);

    if (usernameError) {
      formErrors.username = usernameError;
    }

    if (!form.email.trim()) {
      formErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      formErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      formErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      formErrors.password = "Password must be at least 8 characters.";
    }

    if (form.password !== form.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match.";
    }

    return formErrors;
  }

  function validateStep2() {
    const formErrors = {};

    if (!form.college.trim()) {
      formErrors.college = "College name is required.";
    }

    return formErrors;
  }

  function validateStep3() {
    const formErrors = {};

    if (form.skills.length < 1) {
      formErrors.skills = "Select at least 1 skill.";
    }

    if (form.domains.length < 1) {
      formErrors.domains = "Select at least 1 domain.";
    }

    return formErrors;
  }

  async function nextStep() {
    if (step === 0) {
      const formErrors = validateStep1();

      if (Object.keys(formErrors).length) {
        setErrors(formErrors);
        return;
      }

      const usernameResult = await checkUsernameAvailability(form.username);

      if (!usernameResult.available) {
        setErrors({
          username: usernameResult.error || "Username is already taken.",
        });
        return;
      }

      setErrors({});
      setStep(1);
      return;
    }

    if (step === 1) {
      const formErrors = validateStep2();

      if (Object.keys(formErrors).length) {
        setErrors(formErrors);
        return;
      }

      setErrors({});
      setStep(2);
    }
  }

  function prevStep() {
    setErrors({});
    setStep((current) => Math.max(current - 1, 0));
  }

  function toggleArray(field, value, max) {
    const current = form[field];
    const exists = current.includes(value);

    if (exists) {
      setField(
        field,
        current.filter((item) => item !== value),
      );
      return;
    }

    if (max && current.length >= max) return;

    setField(field, [...current, value]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formErrors = validateStep3();

    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setServerError("");

    const result = await signUp({
      email: form.email,
      password: form.password,
      fullName: form.fullName,
      username: form.username,
      role: form.role,
      college: form.college,
      yearOfStudy: form.yearOfStudy,
      mobile: form.mobile,
      skills: form.skills,
      domains: form.domains,
    });

    setLoading(false);

    if (result?.error) {
      setServerError(result.error);
      return;
    }

    navigate(ROUTES.VERIFY_EMAIL, { replace: true });
  }

  async function handleOAuth(provider) {
    setOauthLoading(provider);

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
        {/* Left panel */}
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
                Join the builder ecosystem
              </p>

              <h1 className="max-w-xl text-6xl font-black leading-tight tracking-tight">
                Create.
                <br />
                Team up.
                <br />
                Build more.
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-white/65">
                Create your Synapse profile, choose your username, join
                hackathons, form teams, and continue projects after the demo.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <AuthStat value="AI" label="Reports" />
              <AuthStat value="Team" label="Matching" />
              <AuthStat value="Live" label="Events" />
            </div>
          </div>
        </section>

        {/* Form panel */}
        <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14">
          <div className="w-full max-w-lg">
            <div className="mb-8 text-center">
              <Link
                to={ROUTES.HOME}
                className="mx-auto mb-6 flex justify-center lg:hidden"
              >
                <img
                  src={logo}
                  alt="Synapse Logo"
                  className="h-14 w-auto object-contain"
                />
              </Link>

              <p className="text-sm font-black uppercase tracking-[0.2em] text-synapse-700">
                Create Account
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-gray-900">
                Join Synapse
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Choose your custom username and set up your hackathon profile.
              </p>
            </div>

            <StepProgress current={step} />

            {serverError && (
              <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8">
              {step === 0 && (
                <div className="space-y-4">
                  <Field
                    label="Full name"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    placeholder="Enter your full name"
                  />

                  <div>
                    <Field
                      label="Username"
                      name="username"
                      value={form.username}
                      onChange={(e) =>
                        setField("username", normalizeUsername(e.target.value))
                      }
                      error={errors.username}
                      placeholder="e.g. sujal-22"
                    />

                    {!errors.username && usernameStatus.message && (
                      <p
                        className={`mt-1.5 text-xs font-semibold ${
                          usernameStatus.available
                            ? "text-emerald-600"
                            : usernameStatus.checking
                              ? "text-gray-400"
                              : "text-red-500"
                        }`}
                      >
                        {usernameStatus.message}
                      </p>
                    )}
                  </div>

                  <Field
                    label="Email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="Enter your email"
                  />

                  <PasswordField
                    label="Password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    error={errors.password}
                    show={showPass}
                    onToggle={() => setShowPass((prev) => !prev)}
                    placeholder="Minimum 8 characters"
                  />

                  <PasswordField
                    label="Confirm password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    show={showConfirm}
                    onToggle={() => setShowConfirm((prev) => !prev)}
                    placeholder="Confirm your password"
                  />

                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full rounded-2xl bg-gray-900 px-5 py-3.5 text-sm font-black text-white hover:bg-black"
                  >
                    Continue
                  </button>

                  <OAuthSection loading={oauthLoading} onOAuth={handleOAuth} />
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="mb-3 block text-sm font-bold text-gray-700">
                      I am joining as
                    </label>

                    <div className="grid gap-3">
                      {ROLE_OPTIONS.map((role) => (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => setField("role", role.value)}
                          className={`rounded-2xl border p-4 text-left transition ${
                            form.role === role.value
                              ? "border-synapse-700 bg-synapse-50"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                        >
                          <p className="text-sm font-black text-gray-900">
                            {role.label}
                          </p>
                          <p className="mt-1 text-sm text-gray-400">
                            {role.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Field
                    label="College / University"
                    name="college"
                    value={form.college}
                    onChange={handleChange}
                    error={errors.college}
                    placeholder="Enter your college name"
                  />

                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Year of study
                    </label>

                    <select
                      value={form.yearOfStudy}
                      onChange={(e) => setField("yearOfStudy", e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-sm text-gray-900 outline-none focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50"
                    >
                      <option value="">Select year</option>
                      {YEAR_OPTIONS.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Field
                    label="Mobile number"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="Optional"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="rounded-2xl border border-gray-200 px-5 py-3.5 text-sm font-black text-gray-700 hover:bg-gray-50"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={nextStep}
                      className="rounded-2xl bg-gray-900 px-5 py-3.5 text-sm font-black text-white hover:bg-black"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <ChipSection
                    label="Your skills"
                    hint="Pick up to 8"
                    options={SKILL_OPTIONS}
                    selected={form.skills}
                    error={errors.skills}
                    max={8}
                    onToggle={(skill) => toggleArray("skills", skill, 8)}
                  />

                  <ChipSection
                    label="Preferred domains"
                    hint="Pick up to 3"
                    options={DOMAIN_OPTIONS}
                    selected={form.domains}
                    error={errors.domains}
                    max={3}
                    onToggle={(domain) => toggleArray("domains", domain, 3)}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="rounded-2xl border border-gray-200 px-5 py-3.5 text-sm font-black text-gray-700 hover:bg-gray-50"
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="rounded-2xl bg-gray-900 px-5 py-3.5 text-sm font-black text-white hover:bg-black disabled:opacity-60"
                    >
                      {loading ? "Creating..." : "Create Account"}
                    </button>
                  </div>

                  <p className="text-center text-xs leading-5 text-gray-400">
                    By signing up, you agree to the Synapse Terms and Privacy
                    Policy.
                  </p>
                </div>
              )}
            </form>

            <p className="mt-8 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to={ROUTES.LOGIN}
                className="font-black text-gray-900 hover:text-synapse-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function StepProgress({ current }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {STEPS.map((step, index) => (
        <div key={step}>
          <div
            className={`h-2 rounded-full ${
              index <= current ? "bg-synapse-700" : "bg-gray-100"
            }`}
          />
          <p
            className={`mt-2 text-xs font-bold ${
              index === current ? "text-synapse-700" : "text-gray-400"
            }`}
          >
            {step}
          </p>
        </div>
      ))}
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-2xl border bg-white px-5 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
            : "border-gray-200 focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50"
        }`}
      />

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function PasswordField({
  label,
  name,
  value,
  onChange,
  error,
  show,
  onToggle,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-2xl border bg-white px-5 py-3.5 pr-14 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
              : "border-gray-200 focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50"
          }`}
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-700"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function ChipSection({ label, hint, options, selected, max, onToggle, error }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <label className="text-sm font-bold text-gray-700">{label}</label>
        <span className="text-xs font-bold text-gray-400">
          {selected.length}/{max} {hint}
        </span>
      </div>

      <div className="flex max-h-44 flex-wrap gap-2 overflow-y-auto rounded-2xl border border-gray-100 bg-gray-50 p-3">
        {options.map((option) => {
          const active = selected.includes(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`rounded-full px-3 py-2 text-xs font-bold transition ${
                active
                  ? "bg-synapse-700 text-white"
                  : "bg-white text-gray-600 hover:bg-synapse-50 hover:text-synapse-700"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function OAuthSection({ loading, onOAuth }) {
  return (
    <>
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-100" />
        <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
          Or continue with
        </span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onOAuth("google")}
          disabled={loading === "google"}
          className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
        >
          {loading === "google" ? "Loading..." : "Google"}
        </button>

        <button
          type="button"
          onClick={() => onOAuth("github")}
          disabled={loading === "github"}
          className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
        >
          {loading === "github" ? "Loading..." : "GitHub"}
        </button>
      </div>
    </>
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
