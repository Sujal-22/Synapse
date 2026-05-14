import { cn } from "../../utils/index";

export function Input({
  icon,
  error,
  className = "",
  wrapperClassName = "",
  ...props
}) {
  return (
    <div className={cn("w-full", wrapperClassName)}>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          className={cn(
            "w-full rounded-2xl border bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400",
            icon ? "pl-11" : "",
            error
              ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
              : "border-gray-200 focus:border-synapse-600 focus:ring-4 focus:ring-synapse-50",
            className,
          )}
          {...props}
        />
      </div>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default Input;
