import { cn } from "../../utils/index";

export function StepProgress({ steps = [], current = 0 }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const active = index === current;
          const completed = index < current;

          return (
            <div key={step} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition",
                    completed
                      ? "bg-synapse-700 border-synapse-700 text-white"
                      : active
                        ? "bg-white border-synapse-700 text-synapse-700"
                        : "bg-white border-gray-200 text-gray-400",
                  )}
                >
                  {completed ? "✓" : index + 1}
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 mx-2 rounded-full transition",
                      completed ? "bg-synapse-700" : "bg-gray-200",
                    )}
                  />
                )}
              </div>

              <p
                className={cn(
                  "mt-2 text-[10px] font-semibold",
                  active || completed ? "text-synapse-700" : "text-gray-400",
                )}
              >
                {step}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProgressBar({ value = 0, className = "" }) {
  const safeValue = Math.min(Math.max(value, 0), 100);

  return (
    <div
      className={cn(
        "h-2 w-full bg-gray-100 rounded-full overflow-hidden",
        className,
      )}
    >
      <div
        className="h-full bg-synapse-700 rounded-full transition-all"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}

export default StepProgress;
