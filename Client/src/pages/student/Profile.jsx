import { useState, useEffect } from "react";
import { useAuth } from "../../context/useAuth.jsx";
import { SKILL_OPTIONS, DOMAIN_OPTIONS } from "../../utils/Constants.js";
import { supabase } from "../../lib/supabase.js";
import {
  getDisplayName,
  getUsername,
  getAvatarLetter,
} from "../../utils/userDisplay";

export default function Profile() {
  const { user, profile, updateProfile, fetchProfile } = useAuth();

  const [form, setForm] = useState({
    full_name: "",
    bio: "",
    college: "",
    year_of_study: "",
    mobile: "",
    github_url: "",
    linkedin_url: "",
    skills: [],
    domains: [],
    avatar_url: "",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled || !profile) return;

      setForm({
        full_name: profile.full_name || "",
        bio: profile.bio || "",
        college: profile.college || "",
        year_of_study: profile.year_of_study || "",
        mobile: profile.mobile || "",
        github_url: profile.github_url || "",
        linkedin_url: profile.linkedin_url || "",
        skills: profile.skills || [],
        domains: profile.domains || [],
        avatar_url: profile.avatar_url || "",
      });
    });

    return () => {
      cancelled = true;
    };
  }, [profile]);

  const displayName = getDisplayName(profile, user);
  const username = getUsername(profile, user);
  const avatarLetter = getAvatarLetter(profile, user);

  const handleInput = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setMessage("");
    setError("");
  };

  const toggleArray = (key, value, max) => {
    setForm((prev) => {
      const exists = prev[key].includes(value);
      if (exists) {
        return { ...prev, [key]: prev[key].filter((v) => v !== value) };
      }
      if (max && prev[key].length >= max) return prev;
      return { ...prev, [key]: [...prev[key], value] };
    });
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setError("Only PNG, JPG, or WEBP images allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be smaller than 2MB.");
      return;
    }

    setUploading(true);
    setError("");
    setMessage("");

    try {
      const ext = file.name.split(".").pop();
      const filePath = `${user.id}/avatar-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
        });
      if (uploadError) throw uploadError;

      const { data: publicData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);
      const url = publicData?.publicUrl;
      if (!url) throw new Error("Failed to get public URL.");

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: url })
        .eq("id", user.id);
      if (updateError) throw updateError;

      handleInput("avatar_url", url);
      await fetchProfile(user.id);
      setMessage("Profile picture updated.");
    } catch (err) {
      setError(err.message || "Avatar upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSave = async () => {
    if (!user?.id) return;
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const { error: updateError } = await updateProfile({
        full_name: form.full_name,
        bio: form.bio,
        college: form.college,
        year_of_study: form.year_of_study,
        mobile: form.mobile,
        github_url: form.github_url,
        linkedin_url: form.linkedin_url,
        skills: form.skills,
        domains: form.domains,
        avatar_url: form.avatar_url,
      });
      if (updateError) throw updateError;
      await fetchProfile(user.id);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err.message || "Could not save profile.");
    } finally {
      setSaving(false);
    }
  };

  const progress =
    (["full_name", "college", "year_of_study"].filter((k) => form[k])?.length +
      (form.bio ? 1 : 0) +
      (form.avatar_url ? 1 : 0) +
      (form.skills?.length ? 1 : 0) +
      (form.domains?.length ? 1 : 0) +
      (form.github_url ? 1 : 0) +
      (form.linkedin_url ? 1 : 0)) /
    8;

  return (
    <main className="min-h-screen w-full bg-gray-50" style={{fontFamily:"instrument serif"}}>
      {/* Profile Hero */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto w-full max-w-340 px-6 py-12 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div className="rounded-4xl bg-linear-to-br from-indigo-950 via-synapse-800 to-blue-900 p-8 text-white shadow-xl">
              <div className="flex flex-col items-center gap-6 md:flex-row">
                <div className="gap-6">
                  {form.avatar_url ? (
                    <img
                      src={form.avatar_url}
                      alt={displayName}
                      className="h-28 w-28 rounded-3xl object-cover shadow-lg ring-4 ring-white/20"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-white text-4xl font-black text-synapse-700 shadow-lg ring-4 ring-white/20">
                      {avatarLetter}
                    </div>
                  )}

                  <label className="relative cursor-pointer rounded-full bg-white px-4 py-3 text-xs font-bold text-gray-900 shadow-lg hover:bg-gray-100">
                    {uploading ? "Uploading..." : "Change Photo"}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleAvatarUpload}
                      disabled={uploading}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />
                  </label>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 ring-1 ring-white/10">
                    Your Profile
                  </p>
                  <h1 className="mt-4 text-3xl font-black sm:text-4xl">
                    {displayName}
                  </h1>
                  <p className="mt-1 text-sm font-semibold text-white/60">
                    {username}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-white/70">
                    {form.bio ||
                      "Add your bio, skills, and social links to personalise your profile."}
                  </p>
                </div>
              </div>
            </div>

            <aside className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-synapse-700">
                Profile Completion
              </p>
              <h2 className="mt-3 text-3xl font-black text-gray-900">
                {Math.round(progress * 100)}%
              </h2>
              <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-synapse-700"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Complete your profile for better team matching and visibility.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {!form.avatar_url && <Chip text="Photo" />}
                {!form.bio && <Chip text="Bio" />}
                {!form.github_url && <Chip text="GitHub" />}
                {!form.linkedin_url && <Chip text="LinkedIn" />}
                {!form.skills?.length && <Chip text="Skills" />}
                {!form.domains?.length && <Chip text="Domains" />}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Edit Form and Live Preview */}
      <section className="mx-auto w-full max-w-340 px-6 py-12 sm:px-8 lg:px-10">
        {message && (
          <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Left column: form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-10"
          >
            {/* Personal Info */}
            <div className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black text-gray-900">
                Personal Info
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Update your basic details below.
              </p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <TextInput
                  label="Full Name"
                  value={form.full_name}
                  onChange={(val) => handleInput("full_name", val)}
                  placeholder="Your name"
                />
                <TextInput
                  label="College / University"
                  value={form.college}
                  onChange={(val) => handleInput("college", val)}
                  placeholder="Your college"
                />
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Year of Study
                  </label>
                  <select
                    value={form.year_of_study}
                    onChange={(e) =>
                      handleInput("year_of_study", e.target.value)
                    }
                    className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-sm text-gray-900 outline-none focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50"
                  ></select>
                </div>
                <TextInput
                  label="Mobile"
                  value={form.mobile}
                  onChange={(val) => handleInput("mobile", val)}
                  placeholder="Mobile number"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black text-gray-900">Bio</h3>
              <p className="mt-1 text-sm text-gray-500">
                A short description about yourself.
              </p>
              <div className="mt-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Bio
                </label>
                <textarea
                  value={form.bio}
                  onChange={(e) => handleInput("bio", e.target.value)}
                  rows={4}
                  placeholder="Tell us about your skills, interests, and goals..."
                  className="w-full resize-none rounded-2xl border border-gray-200 px-5 py-3.5 text-sm text-gray-900 outline-none focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50"
                />
              </div>
            </div>

            {/* Skills & Domains */}
            <div className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black text-gray-900">
                Skills & Domains
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Enhance your matching accuracy by selecting relevant skills and
                domains.
              </p>

              {/* Skills */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-700">
                    Skills
                  </label>
                  <span className="text-xs font-semibold text-gray-400">
                    {form.skills.length}/8
                  </span>
                </div>
                <div className="mt-3 flex max-h-44 flex-wrap gap-2 overflow-y-auto rounded-2xl border border-gray-100 bg-gray-50 p-3">
                  {SKILL_OPTIONS.map((skill) => {
                    const active = form.skills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleArray("skills", skill, 8)}
                        className={`rounded-full px-3 py-2 text-xs font-bold transition ${
                          active
                            ? "bg-synapse-700 text-white"
                            : "bg-white text-gray-600 hover:bg-synapse-50 hover:text-synapse-700"
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Domains */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-700">
                    Preferred Domains
                  </label>
                  <span className="text-xs font-semibold text-gray-400">
                    {form.domains.length}/3
                  </span>
                </div>
                <div className="mt-3 flex max-h-44 flex-wrap gap-2 overflow-y-auto rounded-2xl border border-gray-100 bg-gray-50 p-3">
                  {DOMAIN_OPTIONS.map((domain) => {
                    const active = form.domains.includes(domain);
                    return (
                      <button
                        key={domain}
                        type="button"
                        onClick={() => toggleArray("domains", domain, 3)}
                        className={`rounded-full px-3 py-2 text-xs font-bold transition ${
                          active
                            ? "bg-synapse-700 text-white"
                            : "bg-white text-gray-600 hover:bg-synapse-50 hover:text-synapse-700"
                        }`}
                      >
                        {domain}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black text-gray-900">Social Links</h3>
              <p className="mt-1 text-sm text-gray-500">
                Share your coding presence and professional profile.
              </p>
              <div className="mt-4 space-y-5">
                <TextInput
                  label="GitHub URL"
                  value={form.github_url}
                  onChange={(val) => handleInput("github_url", val)}
                  placeholder="https://github.com/username"
                />
                <TextInput
                  label="LinkedIn URL"
                  value={form.linkedin_url}
                  onChange={(val) => handleInput("linkedin_url", val)}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>

            {/* Save button */}
            <button
              type="submit"
              disabled={saving || uploading}
              className="w-full rounded-2xl bg-synapse-700 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-synapse-200 hover:bg-synapse-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </form>

          {/* Right column: live preview */}
          <aside className="space-y-6">
            <div className="rounded-4xl bg-gray-900 p-6 text-white shadow-xl">
              <h3 className="text-lg font-bold">Profile Preview</h3>
              <div className="mt-4 flex items-center gap-4">
                {form.avatar_url ? (
                  <img
                    src={form.avatar_url}
                    alt={displayName}
                    className="h-16 w-16 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-synapse-700 text-2xl font-black">
                    {avatarLetter}
                  </div>
                )}
                <div>
                  <p className="text-xl font-black">
                    {form.full_name || displayName}
                  </p>
                  <p className="text-sm font-semibold text-white/60">
                    {username}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/70">
                {form.bio || "Your bio will appear here."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {form.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function TextInput({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-700">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-gray-200 px-5 py-3.5 text-sm text-gray-900 outline-none focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50"
      />
    </div>
  );
}

function Chip({ text }) {
  return (
    <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
      Missing {text}
    </span>
  );
}
