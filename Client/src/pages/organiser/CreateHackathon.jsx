import { useState } from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function CreateHackathon() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    prize_pool: "",
    max_team_size: "",
    min_team_size: "",
  });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Hackathon creation service will be connected next.");
  }

  return (
    <main className="min-h-screen bg-gray-50 max-w-md mx-auto px-5 pt-12 pb-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create Hackathon</h1>
        <p className="text-sm text-gray-400 mt-1">
          Publish a new event for participants.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4"
      >
        <Input
          name="title"
          placeholder="Hackathon title"
          value={form.title}
          onChange={handleChange}
        />
        <Input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <Input
          name="prize_pool"
          placeholder="Prize pool"
          value={form.prize_pool}
          onChange={handleChange}
        />
        <Input
          name="min_team_size"
          placeholder="Minimum team size"
          value={form.min_team_size}
          onChange={handleChange}
        />
        <Input
          name="max_team_size"
          placeholder="Maximum team size"
          value={form.max_team_size}
          onChange={handleChange}
        />

        <Button type="submit" size="full">
          Create Event
        </Button>
      </form>
    </main>
  );
}
