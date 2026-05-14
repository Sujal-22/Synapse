import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { ROUTES } from "../../utils/Constants";

const IconMail = (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

export default function ForgotPassword() {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    setLoading(true);
    setError("");
    setStatus("");

    const { error } = await resetPassword(email);

    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    setStatus("Password reset link sent. Check your email inbox.");
  }

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto px-6 py-12">
      <Link
        to={ROUTES.LOGIN}
        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 mb-8"
      >
        ←
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reset password</h1>
        <p className="text-sm text-gray-400 mt-2">
          Enter your registered email. We will send a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-100 rounded-2xl px-4 py-3 text-sm">
            {error}
          </div>
        )}
        {status && (
          <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-2xl px-4 py-3 text-sm">
            {status}
          </div>
        )}

        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={IconMail}
          inputMode="email"
          autoComplete="email"
        />

        <Button type="submit" size="full" loading={loading}>
          Send Reset Link
        </Button>
      </form>
    </div>
  );
}
