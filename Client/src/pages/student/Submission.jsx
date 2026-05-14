import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function Submission() {
  const navigate = useNavigate();
  const { hackathonId } = useParams();

  const [form, setForm] = useState({
    project_name: "",
    description: "",
    repo_url: "",
    demo_url: "",
    readme_url: "",
    tech_stack: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    // Later: call postHackathonService / submission service here.
    setTimeout(() => {
      setLoading(false);
      navigate(`/post-hackathon/${hackathonId || "demo-submission"}`);
    }, 700);
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-24 max-w-md mx-auto px-5 pt-12">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Submit Project</h1>
        <p className="text-sm text-gray-400 mt-1">
          Submit your project to unlock the AI post-hackathon report.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4"
      >
        <Input
          name="project_name"
          placeholder="Project name"
          value={form.project_name}
          onChange={handleChange}
        />
        <Input
          name="description"
          placeholder="Short description"
          value={form.description}
          onChange={handleChange}
        />
        <Input
          name="repo_url"
          placeholder="GitHub repository URL"
          value={form.repo_url}
          onChange={handleChange}
        />
        <Input
          name="demo_url"
          placeholder="Demo URL"
          value={form.demo_url}
          onChange={handleChange}
        />
        <Input
          name="readme_url"
          placeholder="README URL"
          value={form.readme_url}
          onChange={handleChange}
        />
        <Input
          name="tech_stack"
          placeholder="Tech stack, comma separated"
          value={form.tech_stack}
          onChange={handleChange}
        />

        <Button type="submit" size="full" loading={loading}>
          Submit & Generate AI Report
        </Button>
      </form>
    </main>
  );
}
