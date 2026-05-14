import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import { supabase } from "../../lib/supabase";
import { SKILL_OPTIONS, DOMAIN_OPTIONS } from "../../utils/constants";
import {
  getDisplayName,
  getUsername,
  getAvatarLetter,
} from "../../utils/userDisplay";

const YEAR_OPTIONS = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
  { value: "5", label: "5th Year / PG" },
  { value: "0", label: "Alumni / Other" },
];

export default function Profile() {
  const { user, profile,fetchProfile } = useAuth();

  const displayName = getDisplayName(profile,user);
  const username = getUsername(profile,user);
  const avatarLetter = getAvatarLetter(profile,user);

  const [form, setForm] = useState({
    full_name: "",
    mobile: "",
    bio: "",
    college: "",
    year_of_study: "",
    github_url: "",
    linkedin_url: "",
    avatar_url: "",
    skills: [],
    domains: [],
  });

  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled || !profile) return;

      setForm({
        full_name: profile.full_name || "",
        mobile: profile.mobile || "",
        bio: profile.bio || "",
        college: profile.college || "",
        year_of_study: profile.year_of_study || "",
        github_url: profile.github_url || "",
        linkedin_url: profile.linkedin_url || "",
        avatar_url: profile.avatar_url || "",
        skills: profile.skills || [],
        domains: profile.domains || [],
      });
    });

    return () => {
      cancelled = true;
    };
  }, [profile]);

  function setField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (message) setMessage("");
    if (error) setError("");
  }

  function toggleArray(field, value, max) {
    const current = form[field] || [];
    const exists = current.includes(value);

    if (exists) {
      setField(
        field,
        current.filter((item) => item !== value),
      );
      return;
    }

    if (max && current.length >= max) return;

    setField(field, [...current, value]);
  }

 async function handleAvatarUpload(event) {
   const file = event.target.files?.[0];

   if (!file || !user?.id) return;

   setUploadingAvatar(true);
   setError("");
   setMessage("");

   try {
     const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

     if (!allowedTypes.includes(file.type)) {
       throw new Error("Only JPG, PNG, or WEBP images are allowed.");
     }

     if (file.size > 2 * 1024 * 1024) {
       throw new Error("Profile picture must be less than 2MB.");
     }

     const fileExt = file.name.split(".").pop();
     const filePath = `${user.id}/avatar-${Date.now()}.${fileExt}`;

     const { error: uploadError } = await supabase.storage
       .from("avatars")
       .upload(filePath, file, {
         cacheControl: "3600",
         upsert: true,
       });

     if (uploadError) throw uploadError;

     const { data: publicUrlData } = supabase.storage
       .from("avatars")
       .getPublicUrl(filePath);

     const publicUrl = publicUrlData?.publicUrl;

     if (!publicUrl) {
       throw new Error("Could not generate avatar URL.");
     }

     const { data: updatedProfile, error: updateError } = await supabase
       .from("profiles")
       .update({ avatar_url: publicUrl })
       .eq("id", user.id)
       .select("*")
       .single();

     if (updateError) throw updateError;

     setForm((prev) => ({
       ...prev,
       avatar_url: updatedProfile.avatar_url,
     }));

     await fetchProfile(user.id);

     setMessage("Profile picture updated successfully.");
   } catch (err) {
     console.error("Avatar upload error:", err);
     setError(err.message || "Profile picture update failed.");
   } finally {
     setUploadingAvatar(false);
     event.target.value = "";
   }
 }
async function handleSave(e) {
  e.preventDefault();

  if (!user?.id) {
    setError("User is not authenticated.");
    return;
  }

  setSaving(true);
  setError("");
  setMessage("");

  try {
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: form.full_name,
        mobile: form.mobile,
        bio: form.bio,
        college: form.college,
        year_of_study: form.year_of_study,
        github_url: form.github_url,
        linkedin_url: form.linkedin_url,
        avatar_url: form.avatar_url,
        skills: form.skills,
        domains: form.domains,
      })
      .eq("id", user.id);

    if (updateError) throw updateError;

    await fetchProfile(user.id);

    setMessage("Profile updated successfully.");
  } catch (err) {
    console.error("Profile save error:", err);
    setError(err.message || "Profile update failed.");
  } finally {
    setSaving(false);
  }
}

  const completion = calculateProfileCompletion(form);

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-gray-50">
      {/* Hero */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid w-full min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="min-w-0 rounded-4xl bg-linear-to-br from-indigo-950 via-synapse-800 to-blue-900 p-8 text-white shadow-xl">
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="relative h-28 w-28 shrink-0">
                  {form.avatar_url ? (
                    <img
                      src={form.avatar_url}
                      alt={displayName}
                      className="h-28 w-28 rounded-3xl border-4 border-white/20 object-cover shadow-lg"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-4 border-white/20 bg-white text-4xl font-black text-synapse-700 shadow-lg">
                      {avatarLetter}
                    </div>
                  )}

                  <label className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-black text-gray-900 shadow-lg hover:bg-gray-100">
                    {uploadingAvatar ? "Uploading..." : "Change"}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleAvatarUpload}
                      disabled={uploadingAvatar}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white/80 ring-1 ring-white/10">
                    Profile
                  </p>

                  <h1 className="mt-5 truncate text-4xl font-black tracking-tight sm:text-5xl">
                    {displayName}
                  </h1>

                  <p className="mt-2 truncate text-lg font-semibold text-white/60">
                    {username}
                  </p>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
                    {form.bio ||
                      "Add your bio, skills, social links, and profile picture to improve your Synapse team matching."}
                  </p>
                </div>
              </div>
            </div>

            <aside className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-synapse-700">
                Profile Completion
              </p>

              <h2 className="mt-3 text-3xl font-black text-gray-900">
                {completion}%
              </h2>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-synapse-700"
                  style={{ width: `${completion}%` }}
                />
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-500">
                Complete your profile to get better teammate recommendations and
                stronger project visibility.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {!form.avatar_url && <MissingChip label="Photo" />}
                {!form.bio && <MissingChip label="Bio" />}
                {!form.github_url && <MissingChip label="GitHub" />}
                {!form.linkedin_url && <MissingChip label="LinkedIn" />}
                {form.skills.length === 0 && <MissingChip label="Skills" />}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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

        <form
          onSubmit={handleSave}
          className="grid w-full min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]"
        >
          {/* Left Column */}
          <div className="space-y-8">
            <section className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
              <SectionHeading
                title="Personal Information"
                subtitle="Basic details shown across your Synapse profile."
              />

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <Field
                  label="Full name"
                  value={form.full_name}
                  onChange={(value) => setField("full_name", value)}
                  placeholder="Enter your full name"
                />

                <Field
                  label="Username"
                  value={username}
                  disabled
                  placeholder="@username"
                  helper="Username is chosen during registration."
                />

                <Field
                  label="College / University"
                  value={form.college}
                  onChange={(value) => setField("college", value)}
                  placeholder="Enter your college"
                />

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Year of study
                  </label>

                  <select
                    value={form.year_of_study}
                    onChange={(e) => setField("year_of_study", e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-sm text-gray-900 outline-none focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50"
                  >
                    <option value="">Select year</option>
                    {YEAR_OPTIONS.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <Field
                  label="Mobile"
                  value={form.mobile}
                  onChange={(value) => setField("mobile", value)}
                  placeholder="Enter mobile number"
                />

                <Field
                  label="Avatar URL"
                  value={form.avatar_url}
                  onChange={(value) => setField("avatar_url", value)}
                  placeholder="Or paste image URL"
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Bio
                </label>

                <textarea
                  value={form.bio}
                  onChange={(e) => setField("bio", e.target.value)}
                  placeholder="Write a short bio about your skills, interests, and hackathon goals..."
                  rows={5}
                  className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50"
                />
              </div>
            </section>

            <section className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
              <SectionHeading
                title="Skills and Domains"
                subtitle="These help Synapse recommend better teams and events."
              />

              <div className="mt-6 space-y-6">
                <ChipSection
                  label="Skills"
                  max={8}
                  options={SKILL_OPTIONS}
                  selected={form.skills}
                  onToggle={(skill) => toggleArray("skills", skill, 8)}
                />

                <ChipSection
                  label="Preferred domains"
                  max={3}
                  options={DOMAIN_OPTIONS}
                  selected={form.domains}
                  onToggle={(domain) => toggleArray("domains", domain, 3)}
                />
              </div>
            </section>
          </div>

          {/* Right Column */}
          <aside className="space-y-8">
            <section className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
              <SectionHeading
                title="Social Links"
                subtitle="Add links that represent your work."
              />

              <div className="mt-6 space-y-5">
                <Field
                  label="GitHub URL"
                  value={form.github_url}
                  onChange={(value) => setField("github_url", value)}
                  placeholder="https://github.com/username"
                />

                <Field
                  label="LinkedIn URL"
                  value={form.linkedin_url}
                  onChange={(value) => setField("linkedin_url", value)}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </section>

            <section className="rounded-4xl bg-gray-900 p-6 text-white shadow-xl">
              <p className="text-sm font-bold text-white/50">Public Preview</p>

              <div className="mt-6 flex items-center gap-4">
                {form.avatar_url ? (
                  <img
                    src={form.avatar_url}
                    alt={displayName}
                    className="h-16 w-16 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl font-black text-gray-900">
                    {avatarLetter}
                  </div>
                )}

                <div className="min-w-0">
                  <h3 className="truncate text-xl font-black">
                    {form.full_name || displayName}
                  </h3>
                  <p className="truncate text-sm font-semibold text-white/50">
                    {username}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-white/60">
                {form.bio ||
                  "Your bio will appear here after you add profile details."}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {form.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <button
              type="submit"
              disabled={saving || uploadingAvatar}
              className="w-full rounded-2xl bg-synapse-700 px-5 py-4 text-sm font-black text-white shadow-lg shadow-synapse-200 hover:bg-synapse-800 disabled:opacity-60"
            >
              {saving ? "Saving Profile..." : "Save Profile"}
            </button>
          </aside>
        </form>
      </section>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  helper,
  disabled = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-700">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-2xl border px-5 py-3.5 text-sm outline-none transition placeholder:text-gray-400 ${
          disabled
            ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-400"
            : "border-gray-200 bg-white text-gray-900 focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50"
        }`}
      />

      {helper && <p className="mt-1.5 text-xs text-gray-400">{helper}</p>}
    </div>
  );
}

function ChipSection({ label, options, selected, max, onToggle }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <label className="text-sm font-bold text-gray-700">{label}</label>
        <span className="text-xs font-bold text-gray-400">
          {selected.length}/{max}
        </span>
      </div>

      <div className="flex max-h-56 flex-wrap gap-2 overflow-y-auto rounded-2xl border border-gray-100 bg-gray-50 p-3">
        {options.map((option) => {
          const active = selected.includes(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`rounded-full px-3 py-2 text-xs font-bold transition ${
                active
                  ? "bg-synapse-700 text-white"
                  : "bg-white text-gray-600 hover:bg-synapse-50 hover:text-synapse-700"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SectionHeading({ title, subtitle }) {
  return (
    <div>
      <h2 className="text-2xl font-black text-gray-900">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-gray-400">{subtitle}</p>
    </div>
  );
}

function MissingChip({ label }) {
  return (
    <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
      Missing {label}
    </span>
  );
}

function calculateProfileCompletion(form) {
  const checks = [
    form.full_name,
    form.bio,
    form.college,
    form.year_of_study,
    form.github_url,
    form.linkedin_url,
    form.avatar_url,
    form.skills.length > 0,
    form.domains.length > 0,
  ];

  const completed = checks.filter(Boolean).length;

  return Math.round((completed / checks.length) * 100);
}
