import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import { ROUTES } from "../../utils/constants";
import teamImage1 from "../../assets/sujal.jpeg";
import teamImage2 from "../../assets/vedant.jpeg";
import teamImage3 from "../../assets/Prerna.jpeg";
import teamImage4 from "../../assets/humesh.jpeg"


const RECENT_HACKATHONS = [
  {
    id: "ai-impact-hack",
    title: "AI Impact Hack 2026",
    description:
      "Build AI-powered products that solve real-world problems and continue after the demo with Synapse AI guidance.",
    date: "Jun 01 - Jun 03, 2026",
    mode: "Online",
    status: "Applications open",
    tags: ["AI/ML", "Web Development", "Social Impact"],
    button: "View Hackathon",
    active: true,
  },
  {
    id: "web3-build-sprint",
    title: "Web3 Build Sprint",
    description:
      "Create blockchain, Web3, and decentralised applications with a team of complementary builders.",
    date: "Jun 10 - Jun 12, 2026",
    mode: "Online",
    status: "Applications open",
    tags: ["Blockchain", "Open Source", "DevTools"],
    button: "View Hackathon",
    active: true,
  },
  {
    id: "healthtech-innovation",
    title: "HealthTech Innovation Challenge",
    description:
      "Solve healthcare problems using software, AI, data, and user-focused product design.",
    date: "Jun 18 - Jun 20, 2026",
    mode: "Hybrid",
    status: "Coming soon",
    tags: ["HealthTech", "AI/ML", "Mobile"],
    button: "View Hackathon",
    active: false,
  },
];

const DEVELOPERS = [
  {
    name: "Sujal Kumar",
    role: "Full Stack Developer",
    image:
      teamImage1,
    skills: ["React", "Supabase", "Node.js"],
  },
  {
    name: "Vedant",
    role: "Data Analyst",
    image:
      teamImage2,
    skills: ["Python", "ML", "FastAPI"],
  },
  {
    name: "V Humesh",
    role: "Product Manager",
    image:
      teamImage4,
    skills: ["Figma", "Design", "Research"],
  },
  {
    name: "Prerna Raj",
    role: "Backend Developer",
    image:
      teamImage3,
    skills: ["Node.js", "API", "PostgreSQL"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <Header />

      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-linear-to-br from-indigo-950 via-synapse-800 to-blue-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute right-10 top-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
        </div>

        <div className="relative mx-auto grid min-h-140 w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="text-left">
            <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 ring-1 ring-white/10">
              AI-powered hackathon management platform
            </p>

            <h1 className="max-w-3xl text-left text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
              Build teams. Submit projects. Continue after the demo.
            </h1>

            <p className="mt-6 max-w-2xl text-left text-lg leading-8 text-white/70">
              Synapse helps students explore hackathons, form balanced teams,
              submit projects, receive judging feedback, and generate an AI
              post-hackathon roadmap.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to={ROUTES.EXPLORE}
                className="rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-gray-900 shadow-lg hover:bg-gray-100"
              >
                Explore Hackathons
              </Link>

              <Link
                to={ROUTES.REGISTER}
                className="rounded-2xl border border-white/20 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10"
              >
                Create Account
              </Link>
            </div>
          </div>

          <div className="rounded-4xl bg-white/10 p-3 shadow-2xl ring-1 ring-white/10">
            <div className="rounded-3xl bg-white p-6">
              <p className="text-sm font-bold text-synapse-700">
                Live Platform Preview
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
                Upcoming Hackathons
              </h2>

              <div className="mt-6 space-y-4">
                {RECENT_HACKATHONS.slice(0, 3).map((hackathon) => (
                  <MiniHackathonCard key={hackathon.id} hackathon={hackathon} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            title="Smart Team Formation"
            description="Find teammates based on complementary skills instead of random matching."
          />
          <FeatureCard
            title="Project Submission"
            description="Submit repo, demo, README, screenshots, and tech stack in one flow."
          />
          <FeatureCard
            title="AI Post-Hackathon Report"
            description="Generate roadmap, bug checklist, ownership plan, and commercialisation path."
          />
        </div>
      </section>

      {/* Recent Hackathons */}
      <section className="w-full bg-gray-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-synapse-700">
                Recent Hackathons
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Discover active events built for modern developers.
              </h2>
            </div>

            <Link
              to={ROUTES.EXPLORE}
              className="w-fit rounded-2xl bg-gray-900 px-6 py-3 text-sm font-bold text-white hover:bg-black"
            >
              View All Hackathons
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {RECENT_HACKATHONS.map((hackathon) => (
              <RecentHackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </div>
        </div>
      </section>

      {/* Developer Spotlight */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-synapse-700">
            Builder Spotlight
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
            Meet developers building with Synapse.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-500">
            Highlight skilled participants, mentors, and builders with social
            profiles and technical expertise.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {DEVELOPERS.map((developer) => (
            <DeveloperCard key={developer.name} developer={developer} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function MiniHackathonCard({ hackathon }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-gray-900">{hackathon.title}</h3>
          <p className="mt-1 text-sm text-gray-400">{hackathon.date}</p>

          <div className="mt-2 flex flex-wrap gap-2">
            {hackathon.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
          {hackathon.status}
        </span>
      </div>
    </div>
  );
}

function RecentHackathonCard({ hackathon }) {
  return (
    <article className="flex min-h-130 flex-col rounded-4xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div>
        <h3 className="text-4xl font-black leading-tight tracking-tight text-gray-900">
          {hackathon.title}
        </h3>

        <p className="mt-5 text-lg leading-8 text-gray-600">
          {hackathon.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {hackathon.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-synapse-50 px-3 py-1.5 text-xs font-bold text-synapse-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-10">
        <div className="border-l-4 border-synapse-600 pl-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
            Runs from
          </p>
          <p className="mt-1 text-xl font-black text-gray-900">
            {hackathon.date}
          </p>

          <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-gray-400">
            Happening
          </p>
          <p className="mt-1 text-xl font-black text-gray-900">
            {hackathon.mode}
          </p>
        </div>

        <div className="mt-6 rounded-2xl bg-gray-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
            Status
          </p>
          <p className="mt-1 text-lg font-black text-gray-900">
            {hackathon.status}
          </p>
        </div>

        <Link
          to={`/hackathon/${hackathon.id}`}
          className={`mt-6 block rounded-2xl px-5 py-4 text-center text-lg font-black transition ${
            hackathon.active
              ? "bg-synapse-700 text-white hover:bg-synapse-800"
              : "bg-synapse-200 text-white"
          }`}
        >
          {hackathon.button}
        </Link>
      </div>
    </article>
  );
}

function DeveloperCard({ developer }) {
  return (
    <article className="group overflow-hidden rounded-4xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-80 overflow-hidden bg-gray-900">
        <img
          src={developer.image}
          alt={developer.name}
          className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

        <div className="absolute left-6 top-6 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white ring-1 ring-white/20">
          Builder
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-3xl font-black text-white">{developer.name}</h3>
          <p className="mt-1 text-sm font-semibold text-white/70">
            {developer.role}
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {developer.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <SocialButton label="Instagram" icon="◎" />
          <SocialButton label="X" icon="𝕏" />
          <SocialButton label="GitHub" icon="GH" />
          <SocialButton label="LinkedIn" icon="in" />
        </div>
      </div>
    </article>
  );
}

function SocialButton({ label, icon }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-synapse-50 text-xs font-black text-synapse-700 transition hover:bg-synapse-700 hover:text-white"
    >
      {icon}
    </a>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-extrabold text-gray-900">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-gray-500">{description}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-[#f3f8f8]">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
        <div>
          <h2 className="max-w-2xl text-5xl font-black leading-tight tracking-tight text-gray-900 sm:text-6xl">
            We love <span className="text-synapse-500">software</span>
            <br />
            and the <span className="text-orange-300">people</span> who
            <br />
            build it.
          </h2>

          <div className="mt-14 flex flex-wrap gap-5 text-2xl text-gray-400">
            <FooterSocial label="Telegram" icon="◉" />
            <FooterSocial label="X" icon="𝕏" />
            <FooterSocial label="Discord" icon="☯" />
            <FooterSocial label="Dribbble" icon="◎" />
            <FooterSocial label="GitHub" icon="GH" />
            <FooterSocial label="LinkedIn" icon="in" />
          </div>

          <div className="mt-16 border-t border-gray-300 pt-8">
            <Link
              to={ROUTES.HOME}
              className="text-3xl font-black text-synapse-600"
            >
              Synapse
            </Link>

            <p className="mt-16 text-sm text-gray-600">
              © 2026, Synapse Hackathon Ecosystem
            </p>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          <FooterColumn
            title="Community"
            links={[
              "Organize a hackathon",
              "Explore hackathons",
              "Code of Conduct",
              "Brand Assets",
              "Documentation",
            ]}
          />

          <FooterColumn
            title="Company"
            links={[
              "About",
              "Blog",
              "Careers",
              "Changelog",
              "Privacy",
              "Terms",
            ]}
          />

          <FooterColumn
            title="Support"
            links={["Guide", "Status", "Contact us"]}
          />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">
        {title}
      </h3>

      <ul className="mt-6 space-y-4">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-lg font-medium text-gray-800 hover:text-synapse-700"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterSocial({ label, icon }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-gray-400 hover:bg-white hover:text-synapse-700"
    >
      {icon}
    </a>
  );
}
