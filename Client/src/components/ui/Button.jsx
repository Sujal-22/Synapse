import { cn } from "../../utils/index";

export function Button({
  children,
  type = "button",
  size = "default",
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed";

  const sizeClasses = {
    default: "px-5 py-3 text-sm",
    sm: "px-4 py-2 text-xs",
    lg: "px-6 py-4 text-base",
    full: "w-full px-5 py-3.5 text-sm",
  };

  const variantClasses = {
    primary: "bg-synapse-700 text-white hover:bg-synapse-800",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    outline: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}

export default Button;
