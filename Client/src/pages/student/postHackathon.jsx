import { useParams } from "react-router-dom";

const REPORT = {
  projectSummary:
    "This project is a hackathon prototype that can be converted into a structured MVP with cleanup, ownership, and validation.",
  whatWorked: [
    "Clear problem framing",
    "Functional prototype",
    "Relevant tech stack",
  ],
  whatFailed: [
    "Limited testing",
    "Incomplete deployment flow",
    "Weak user onboarding",
  ],
  bugFixChecklist: [
    { bug: "Add proper form validation", priority: "high" },
    { bug: "Improve mobile responsiveness", priority: "medium" },
    { bug: "Add empty states", priority: "low" },
  ],
};

export default function PostHackathon() {
  const { submissionId } = useParams();

  return (
    <main className="min-h-screen bg-gray-50 pb-24 max-w-md mx-auto px-5 pt-12">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-wide font-bold text-synapse-700">
          AI Post-Hackathon Report
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mt-1">
          Next Build Plan
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Submission ID: {submissionId}
        </p>
      </header>

      <section className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-4">
        <h2 className="font-bold text-gray-900">Project Summary</h2>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          {REPORT.projectSummary}
        </p>
      </section>

      <ReportList title="What Worked" items={REPORT.whatWorked} />
      <ReportList title="What Failed" items={REPORT.whatFailed} />

      <section className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mt-4">
        <h2 className="font-bold text-gray-900 mb-3">Bug Fix Checklist</h2>

        <div className="space-y-3">
          {REPORT.bugFixChecklist.map((item) => (
            <div
              key={item.bug}
              className="flex items-start justify-between gap-3 bg-gray-50 rounded-2xl p-3"
            >
              <p className="text-sm text-gray-700">{item.bug}</p>
              <span className="text-[10px] uppercase font-bold bg-white border border-gray-100 px-2 py-1 rounded-full">
                {item.priority}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function ReportList({ title, items }) {
  return (
    <section className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mt-4">
      <h2 className="font-bold text-gray-900 mb-3">{title}</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm text-gray-500 flex gap-2">
            <span className="text-synapse-700">•</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
