import { Link, NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import { cn } from "../../utils/index";
import { useAuth } from "../../context/useAuth";
import { getDisplayName, getUsername, getAvatarLetter, } from "../../utils/userDisplay";
import logo from "../../assets/synapse-logo.png";

const navItems = [
  { label: "Home", to: ROUTES.HOME },
  { label: "Explore", to: ROUTES.EXPLORE },
  { label: "Teams", to: ROUTES.TEAMS },
  { label: "Mentors", to: ROUTES.MENTORS },
];

export default function Header() {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const displayName = getDisplayName(profile,user);
  const username = getUsername(profile,user);
  const avatarLetter = getAvatarLetter(profile,user);


  async function handleLogout() {
    const result = await signOut();

    if (result?.error) {
      console.error("Logout failed:", result.error);
      return;
    }
    navigate(ROUTES.HOME, { replace: true });
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-100 border-b w-full border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-340 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to={ROUTES.HOME} className="flex items-center">
          <img
            src={logo}
            alt="Synapse Logo"
            className="h-12 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-xl px-4 py-2 text-sm font-semibold transition",
                  isActive
                    ? "bg-synapse-50 text-synapse-700"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to={ROUTES.DASHBOARD}
                className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 sm:inline-flex"
              >
                Dashboard
              </Link>

              <Link
                to={ROUTES.PROFILE}
                title={`${displayName} ${username}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-synapse-50 text-sm font-bold text-synapse-700"
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={displayName}
                    className="h-full w-full object-cover" />
                ) : (
                  avatarLetter
                )}
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={ROUTES.LOGIN}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-white hover:bg-gray-50"
              >
                Login
              </Link>

              <Link
                to={ROUTES.REGISTER}
                className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-black"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
