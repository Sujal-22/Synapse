import { cn } from "@/utils";

export default function PriorityBadge({ priority = "low" }) {
  const classes = {
    high: "bg-red-50 text-red-600 border-red-100",
    medium: "bg-amber-50 text-amber-700 border-amber-100",
    low: "bg-emerald-50 text-emerald-700 border-emerald-100",
  };

  return (
    <span
      className={cn(
        "text-[10px] uppercase font-bold border px-2 py-1 rounded-full",
        classes[priority] || classes.low,
      )}
    >
      {priority}
    </span>
  );
}
