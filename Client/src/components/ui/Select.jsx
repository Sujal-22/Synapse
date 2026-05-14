import { cn } from "../../utils/index";

export function Select({
  options = [],
  placeholder = "Select option",
  value,
  onChange,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      <select
        value={value}
        onChange={onChange}
        className={cn(
          "w-full appearance-none rounded-2xl border bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition",
          value ? "text-gray-900" : "text-gray-400",
          error
            ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
            : "border-gray-200 focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50",
          className,
        )}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value;
          const label = typeof option === "string" ? option : option.label;

          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default Select;
