export default function AuthHero({
  title = "Synapse",
  subtitle = "Hackathon management for builders.",
  height = 240,
}) {
  return (
    <div className="relative overflow-hidden flex-shrink-0" style={{ height }}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-synapse-700 to-blue-800" />

      <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-white/5" />
      <div className="absolute top-8 right-4 w-24 h-24 rounded-full bg-white/5" />
      <div className="absolute -bottom-6 right-16 w-32 h-32 rounded-full bg-white/5" />

      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern
            id="authDots"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#authDots)" />
      </svg>

      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2 text-center px-6">
        <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-3xl flex items-center justify-center text-3xl">
          ⚡
        </div>

        <h1 className="text-white font-bold text-3xl tracking-tight">
          {title}
        </h1>

        <p className="text-white/60 text-sm max-w-xs">{subtitle}</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 390 32"
          preserveAspectRatio="none"
          className="w-full h-8 fill-white"
        >
          <path d="M0,16 C90,32 300,0 390,16 L390,32 L0,32 Z" />
        </svg>
      </div>
    </div>
  );
}
