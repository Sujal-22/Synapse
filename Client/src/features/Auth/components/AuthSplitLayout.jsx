import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";

export default function AuthSplitLayout({
  title,
  subtitle,
  children,
  mode = "login",
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-sky-100 via-white to-sky-50 px-4 py-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-4xl bg-white shadow-2xl ring-1 ring-black/5 lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-sky-200 lg:block">
          <div className="absolute inset-0 bg-linear-to-br from-sky-100 via-sky-200 to-green-100" />

          <div className="absolute left-8 top-8 rounded-full bg-white/40 px-4 py-2 text-sm font-bold text-sky-900 backdrop-blur">
            Synapse
          </div>

          <div className="absolute inset-x-8 bottom-8">
            <h1 className="text-6xl font-black uppercase leading-none tracking-tight text-white drop-shadow-lg">
              Explore.
              <br />
              Learn.
              <br />
              Grow.
            </h1>

            <p className="mt-5 max-w-md text-sm font-semibold text-sky-950/70">
              Discover hackathons, form teams, submit projects, and continue
              building after the demo.
            </p>
          </div>

          <div className="absolute right-14 top-24 flex h-56 w-56 items-center justify-center rounded-full bg-white/50 text-8xl shadow-xl backdrop-blur">
            ⚡
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <Link
                to={ROUTES.HOME}
                className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 text-lg font-black text-white"
              >
                S
              </Link>

              <h2 className="text-3xl font-black uppercase tracking-tight text-gray-900">
                {title}
              </h2>

              <p className="mt-2 text-sm text-gray-400">{subtitle}</p>
            </div>

            {children}

            <p className="mt-8 text-center text-sm text-gray-400">
              {mode === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <Link
                    to={ROUTES.REGISTER}
                    className="font-bold text-gray-900"
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link to={ROUTES.LOGIN} className="font-bold text-gray-900">
                    Sign in
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
