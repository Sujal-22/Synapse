import { useMemo, useState } from "react";
import { useAuth } from "../../context/useAuth";


const DOMAINS = [
  "All",
  "AI/ML",
  "Frontend",
  "Backend",
  "UI/UX",
  "Product",
  "Startup",
  "DevOps",
];

import {
  createPaymentOrder,
  loadRazorpayScript,
  verifyPayment,
} from "../../services/paymentService";


const MENTORS = [
  {
    id: "mentor-1",
    name: "Rohan Mehta",
    username: "@rohan_ai",
    role: "Senior AI Engineer",
    domain: "AI/ML",
    company: "Ex-Google Developer",
    rating: 4.9,
    sessions: 128,
    price: 499,
    duration: "30 min",
    availability: "Today, 6:00 PM",
    skills: ["ML Models", "Python", "Prompt Engineering", "Deployment"],
    bio: "Helps teams improve AI project architecture, model usage, API integration, and deployment strategy.",
  },
  {
    id: "mentor-2",
    name: "Priya Nair",
    username: "@priya_product",
    role: "Product & UX Mentor",
    domain: "Product",
    company: "Product Consultant",
    rating: 4.8,
    sessions: 96,
    price: 399,
    duration: "30 min",
    availability: "Tomorrow, 11:00 AM",
    skills: ["Product Strategy", "UX Research", "Pitch Deck", "MVP Scope"],
    bio: "Guides teams on product clarity, user flows, MVP planning, pitch preparation, and demo storytelling.",
  },
  {
    id: "mentor-3",
    name: "Arjun Rao",
    username: "@arjun_backend",
    role: "Backend Architect",
    domain: "Backend",
    company: "Cloud Engineer",
    rating: 4.7,
    sessions: 84,
    price: 599,
    duration: "45 min",
    availability: "Friday, 8:00 PM",
    skills: ["Node.js", "Supabase", "PostgreSQL", "System Design"],
    bio: "Supports teams with backend APIs, database schema, authentication, role access, and scalable architecture.",
  },
  {
    id: "mentor-4",
    name: "Meera Kapoor",
    username: "@meera_design",
    role: "UI/UX Design Mentor",
    domain: "UI/UX",
    company: "Design Lead",
    rating: 4.9,
    sessions: 142,
    price: 349,
    duration: "30 min",
    availability: "Today, 9:00 PM",
    skills: ["Figma", "Design Systems", "Landing Pages", "User Flow"],
    bio: "Helps teams convert rough hackathon screens into polished product flows and presentation-ready UI.",
  },
  {
    id: "mentor-5",
    name: "Kunal Shah",
    username: "@kunal_startup",
    role: "Startup Mentor",
    domain: "Startup",
    company: "Founder Coach",
    rating: 4.8,
    sessions: 73,
    price: 799,
    duration: "60 min",
    availability: "Saturday, 5:00 PM",
    skills: ["Business Model", "Validation", "Go-to-Market", "Pitching"],
    bio: "Helps teams understand commercialisation, pricing, target users, market validation, and startup direction.",
  },
  {
    id: "mentor-6",
    name: "Dev Singh",
    username: "@devops_dev",
    role: "DevOps Mentor",
    domain: "DevOps",
    company: "Platform Engineer",
    rating: 4.6,
    sessions: 61,
    price: 449,
    duration: "30 min",
    availability: "Sunday, 12:00 PM",
    skills: ["Vercel", "Render", "CI/CD", "Performance"],
    bio: "Guides teams on deployment, environment variables, hosting, performance, and production readiness.",
  },
];

const PLANS = [
  {
    name: "Quick Review",
    price: "₹199",
    duration: "15 minutes",
    description:
      "Best for quick doubts, UI review, or project direction check.",
    features: ["1:1 mentor call", "Basic feedback", "Short action list"],
  },
  {
    name: "Deep Session",
    price: "₹499",
    duration: "30 minutes",
    description:
      "Best for technical blockers, MVP planning, or pitch improvement.",
    features: ["1:1 mentor call", "Detailed feedback", "Roadmap suggestions"],
    highlighted: true,
  },
  {
    name: "Build Review",
    price: "₹999",
    duration: "60 minutes",
    description: "Best for full project review before submission or demo.",
    features: ["Architecture review", "Pitch review", "Post-session checklist"],
  },
];

function getPlanAmount(planName) {
  const plan = PLANS.find((item) => item.name === planName);

  if (!plan) return 0;

  return Number(plan.price.replace("₹", "").trim());
}

export default function Mentors() {

  const { user,profile } = useAuth();

  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("All");
  const [selectedPlan, setSelectedPlan] = useState("Deep Session");
  const selectedPlanAmount = getPlanAmount(selectedPlan);

  const filteredMentors = useMemo(() => {
    return MENTORS.filter((mentor) => {
      const query = search.toLowerCase();

      const matchesSearch =
        mentor.name.toLowerCase().includes(query) ||
        mentor.username.toLowerCase().includes(query) ||
        mentor.role.toLowerCase().includes(query) ||
        mentor.skills.some((skill) => skill.toLowerCase().includes(query));

      const matchesDomain = domain === "All" || mentor.domain === domain;

      return matchesSearch && matchesDomain;
    });
  }, [search, domain]);

async function handleBookSession(mentor) {
  const amount = getPlanAmount(selectedPlan);

  if (!amount || Number.isNaN(amount)) {
    alert("Invalid payment amount.");
    return;
  }

  try {
    const isLoaded = await loadRazorpayScript();

    if (!isLoaded) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    const selectedPlanData = PLANS.find((plan) => plan.name === selectedPlan);

    const amount =
      selectedPlanData?.price?.replace("₹", "").trim() || mentor.price;

    const orderData = await createPaymentOrder({
      userId: user.id,
      amount,
      purpose: "mentor_booking",
      mentorId: mentor.id,
      mentorName: mentor.name,
      planName: selectedPlan,
    });

    const options = {
      key: orderData.keyId,
      amount: orderData.order.amount,
      currency: orderData.order.currency,
      name: "Synapse",
      description: `${selectedPlan} with ${mentor.name}`,
      order_id: orderData.order.id,

      handler: async function (response) {
        try {
          const verification = await verifyPayment({
            userId: user.id,
            mentorId: mentor.id,
            mentorName: mentor.name,
            planName: selectedPlan,
            amount: Number(amount),
            paymentRecordId: orderData.paymentRecord.id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          alert("Payment successful. Mentor session booked.");

          console.log("Payment verification:", verification);
        } catch (error) {
          console.error("Payment verification failed:", error);
          alert(error.message || "Payment verification failed.");
        }
      },

      prefill: {
        name: profile?.full_name || "",
        email: user.email || "",
      },

      theme: {
        color: "#111827",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error("Payment error:", error);
    alert(error.message || "Payment failed.");
  }
}

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-gray-50"
    style={{fontFamily:"instument serif"}}>
      {/* Hero */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto w-full max-w-340 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid w-full min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="min-w-0 rounded-4xl bg-linear-to-br from-indigo-950 via-synapse-800 to-blue-900 p-8 text-white shadow-xl">
              <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white/80 ring-1 ring-white/10">
                Paid Mentorship
              </p>

              <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
                Book expert mentors for your hackathon project.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
                Get paid 1:1 mentorship for technical blockers, product
                direction, UI/UX review, AI integration, backend architecture,
                deployment, and pitch preparation.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <HeroStat value="6+" label="Mentors" />
                <HeroStat value="₹199" label="Starting" />
                <HeroStat value="Live" label="Booking" />
              </div>
            </div>

            <aside className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-synapse-700">
                Selected Plan
              </p>

              <h2 className="mt-3 text-3xl font-black text-gray-900">
                {selectedPlan}
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Choose a paid mentorship plan based on how deeply you want your
                project reviewed.
              </p>

              <div className="mt-6 space-y-3">
                {PLANS.map((plan) => (
                  <button
                    key={plan.name}
                    type="button"
                    onClick={() => setSelectedPlan(plan.name)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      selectedPlan === plan.name
                        ? "border-synapse-700 bg-synapse-50"
                        : "border-gray-100 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-black text-gray-900">{plan.name}</p>
                        <p className="mt-1 text-xs font-semibold text-gray-400">
                          {plan.duration}
                        </p>
                      </div>

                      <span className="font-black text-synapse-700">
                        {plan.price}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="mx-auto w-full max-w-340 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-synapse-700">
            Pricing
          </p>
          <h2 className="mt-2 text-3xl font-black text-gray-900">
            Paid mentorship plans
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              selected={selectedPlan === plan.name}
              onSelect={() => setSelectedPlan(plan.name)}
            />
          ))}
        </div>
      </section>

      {/* Search */}
      <section className="mx-auto w-full max-w-340 px-4 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-4xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1fr_240px]">
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Search mentors
              </label>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, domain, role, or skill..."
                className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Domain
              </label>

              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-sm text-gray-900 outline-none transition focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50"
              >
                {DOMAINS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {DOMAINS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setDomain(item)}
                className={`rounded-full px-4 py-2 text-xs font-black transition ${
                  domain === item
                    ? "bg-synapse-700 text-white"
                    : "bg-synapse-50 text-synapse-700 hover:bg-synapse-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="mx-auto grid w-full max-w-340 gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
        <div className="min-w-0">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-synapse-700">
                Available Experts
              </p>
              <h2 className="mt-2 text-3xl font-black text-gray-900">
                Book a paid mentor
              </h2>
            </div>

            <p className="text-sm font-semibold text-gray-400">
              {filteredMentors.length} mentor
              {filteredMentors.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredMentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                selectedPlan={selectedPlan}
                selectedPlanAmount={selectedPlanAmount}
                onBook={() => handleBookSession(mentor)}
              />
            ))}
          </div>
        </div>

        <aside className="space-y-8">
          <section className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-gray-900">
              How paid mentorship works
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              Choose a plan, select a mentor, book a slot, and get focused
              guidance for your hackathon project.
            </p>

            <div className="mt-6 space-y-3">
              <ProcessStep number="01" text="Choose a mentorship plan" />
              <ProcessStep number="02" text="Select a domain expert" />
              <ProcessStep number="03" text="Book and pay for a session" />
              <ProcessStep number="04" text="Receive action checklist" />
            </div>
          </section>

          <section className="rounded-4xl bg-gray-900 p-6 text-white shadow-xl">
            <p className="text-sm font-bold text-white/50">
              Recommended for Hackathons
            </p>

            <h2 className="mt-3 text-3xl font-black">Deep Session</h2>

            <p className="mt-4 text-sm leading-7 text-white/60">
              A 30-minute paid session is usually enough for technical review,
              product direction, pitch cleanup, or final submission guidance.
            </p>

            <div className="mt-6 space-y-3">
              <QualityItem label="Best for" value="MVP review" />
              <QualityItem label="Duration" value="30 min" />
              <QualityItem label="Output" value="Checklist" />
              <QualityItem label="Starting" value="₹499" />
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}

function HeroStat({ value, label }) {
  return (
    <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
      <p className="text-3xl font-black text-white">{value}</p>
      <p className="mt-1 text-sm font-semibold text-white/60">{label}</p>
    </div>
  );
}

function PricingCard({ plan, selected, onSelect }) {
  return (
    <article
      className={`rounded-4xl border p-6 shadow-sm transition ${
        selected
          ? "border-synapse-700 bg-synapse-50"
          : "border-gray-100 bg-white hover:-translate-y-1 hover:shadow-xl"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-gray-900">{plan.name}</h3>
          <p className="mt-1 text-sm font-semibold text-gray-400">
            {plan.duration}
          </p>
        </div>

        <p className="text-3xl font-black text-synapse-700">{plan.price}</p>
      </div>

      <p className="mt-4 text-sm leading-7 text-gray-500">{plan.description}</p>

      <div className="mt-6 space-y-3">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-black text-synapse-700">
              ✓
            </span>
            <span className="text-sm font-semibold text-gray-600">
              {feature}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onSelect}
        className={`mt-6 w-full rounded-2xl px-5 py-3 text-sm font-black transition ${
          selected
            ? "bg-synapse-700 text-white"
            : "bg-gray-900 text-white hover:bg-black"
        }`}
      >
        {selected ? "Selected" : "Choose Plan"}
      </button>
    </article>
  );
}

function MentorCard({ mentor, selectedPlan,selectedPlanAmount, onBook }) {
  return (
    <article className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-950 to-synapse-700 text-2xl font-black text-white">
            {mentor.name.charAt(0)}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-xl font-black text-gray-900">
              {mentor.name}
            </h3>
            <p className="truncate text-sm font-semibold text-gray-400">
              {mentor.username}
            </p>
            <p className="mt-1 text-sm font-bold text-synapse-700">
              {mentor.role}
            </p>
          </div>
        </div>

        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">
          {mentor.rating} ★
        </span>
      </div>

      <p className="mt-4 text-sm font-semibold text-gray-400">
        {mentor.company}
      </p>

      <p className="mt-4 text-sm leading-7 text-gray-500">{mentor.bio}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {mentor.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <InfoBox label="selected plan" value={`₹${selectedPlanAmount}`} />
        <InfoBox label="Time" value={mentor.duration} />
        <InfoBox label="Sessions" value={mentor.sessions} />
      </div>

      <div className="mt-5 rounded-2xl bg-gray-50 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-gray-400">
          Next available
        </p>
        <p className="mt-1 text-sm font-black text-gray-900">
          {mentor.availability}
        </p>
      </div>

      <button
        type="button"
        onClick={onBook}
        className="mt-6 w-full rounded-2xl bg-gray-900 px-5 py-3.5 text-sm font-black text-white hover:bg-black"
      >
        Book {selectedPlan}
      </button>
    </article>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-3 text-center">
      <p className="text-[10px] font-black uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-black text-gray-900">{value}</p>
    </div>
  );
}

function ProcessStep({ number, text }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-gray-50 p-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-synapse-700 text-xs font-black text-white">
        {number}
      </span>
      <p className="text-sm font-semibold leading-6 text-gray-600">{text}</p>
    </div>
  );
}

function QualityItem({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
      <span className="text-sm font-bold text-white/60">{label}</span>
      <span className="text-sm font-black text-white">{value}</span>
    </div>
  );
}
