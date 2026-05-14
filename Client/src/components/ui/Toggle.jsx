import { cn } from "../../utils/index";

export function Toggle({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  className = "",
}) {
  function handleToggle() {
    if (disabled) return;
    onChange?.(!checked);
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleToggle}
      className={cn(
        "w-full flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4 text-left transition active:scale-[0.98]",
        disabled
          ? "cursor-not-allowed opacity-60"
          : "hover:border-synapse-200 hover:bg-synapse-50/40",
        className,
      )}
    >
      <div className="min-w-0">
        {label && (
          <p className="text-sm font-semibold text-gray-900">{label}</p>
        )}

        {description && (
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <span
        className={cn(
          "relative inline-flex h-7 w-12 flex-shrink-0 rounded-full transition-colors duration-200",
          checked ? "bg-synapse-700" : "bg-gray-200",
        )}
      >
        <span
          className={cn(
            "absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
            checked ? "translate-x-6" : "translate-x-1",
          )}
        />
      </span>
    </button>
  );
}

export default Toggle;
