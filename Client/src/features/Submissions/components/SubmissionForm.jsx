import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const initialForm = {
  project_name: "",
  description: "",
  repo_url: "",
  demo_url: "",
  readme_url: "",
  tech_stack: "",
};

export default function SubmissionForm({ onSubmit, loading = false }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.project_name.trim()) {
      setError("Project name is required.");
      return;
    }

    if (!form.description.trim()) {
      setError("Project description is required.");
      return;
    }

    if (!form.repo_url.trim()) {
      setError("Repository URL is required.");
      return;
    }

    const payload = {
      ...form,
      tech_stack: form.tech_stack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    onSubmit?.(payload);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4"
    >
      {error && (
        <div className="bg-red-50 text-red-600 border border-red-100 rounded-2xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

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
  );
}
