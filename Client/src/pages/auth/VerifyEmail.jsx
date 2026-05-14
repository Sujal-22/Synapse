import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/Constants";

export default function VerifyEmail() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center max-w-md mx-auto px-6">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-synapse-50 border border-synapse-100 flex items-center justify-center text-4xl mb-6">
          ✉️
        </div>

        <h1 className="text-3xl font-bold text-gray-900">Verify your email</h1>

        <p className="text-sm text-gray-500 mt-3 leading-relaxed">
          We have sent a verification link to your email address. Verify your
          account before logging in.
        </p>

        <Link
          to={ROUTES.LOGIN}
          className="mt-8 inline-flex items-center justify-center w-full rounded-2xl bg-synapse-700 text-white font-semibold py-3.5 shadow-lg shadow-synapse-200"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
