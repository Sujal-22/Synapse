import { NavLink } from "react-router-dom";
import { ROUTES } from "../../utils/Constants";
import { cn } from "../../utils/index";

const navItems = [
  {
    label: "Home",
    to: ROUTES.DASHBOARD,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l9-9 9 9M5 10v11h14V10"
        />
      </svg>
    ),
  },
  {
    label: "Explore",
    to: ROUTES.EXPLORE,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 110-15 7.5 7.5 0 010 15z"
        />
      </svg>
    ),
  },
  {
    label: "Teams",
    to: ROUTES.TEAMS,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m8-4a4 4 0 100-8 4 4 0 000 8zM9 10a4 4 0 100-8 4 4 0 000 8z"
        />
      </svg>
    ),
  },
  {
    label: "Mentors",
    to: ROUTES.MENTORS,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 14l9-5-9-5-9 5 9 5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 14l6.16-3.422A12.083 12.083 0 0118 15.5C18 18.538 15.314 21 12 21s-6-2.462-6-5.5c0-1.734.37-3.398.84-4.922L12 14z"
        />
      </svg>
    ),
  },
  {
    label: "Profile",
    to: ROUTES.PROFILE,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-gray-100 bg-white/95 backdrop-blur">
      <div className="grid grid-cols-5 px-2 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 rounded-2xl py-2 text-[10px] font-semibold transition",
                isActive
                  ? "text-synapse-700 bg-synapse-50"
                  : "text-gray-400 hover:text-gray-700",
              )
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
