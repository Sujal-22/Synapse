import { cn } from "../../utils/index";

export function Chip({ label, selected = false, disabled = false, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-2 text-xs font-semibold transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
        selected
          ? "border-synapse-700 bg-synapse-700 text-white"
          : "border-gray-200 bg-white text-gray-600 hover:border-synapse-200 hover:bg-synapse-50 hover:text-synapse-700",
      )}
    >
      {label}
    </button>
  );
}

export function ChipGroup({
  options = [],
  selected = [],
  onChange,
  max,
  className = "",
}) {
  function toggle(option) {
    const exists = selected.includes(option);

    if (exists) {
      onChange(selected.filter((item) => item !== option));
      return;
    }

    if (max && selected.length >= max) return;

    onChange([...selected, option]);
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const value = typeof option === "string" ? option : option.value;
        const label = typeof option === "string" ? option : option.label;
        const isSelected = selected.includes(value);
        const isDisabled = !isSelected && max && selected.length >= max;

        return (
          <Chip
            key={value}
            label={label}
            selected={isSelected}
            disabled={isDisabled}
            onClick={() => toggle(value)}
          />
        );
      })}
    </div>
  );
}

export default Chip;
