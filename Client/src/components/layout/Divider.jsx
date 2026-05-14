export function Divider({ label }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-gray-100" />

      {label && (
        <span className="text-xs font-medium text-gray-400 whitespace-nowrap">
          {label}
        </span>
      )}

      <div className="h-px flex-1 bg-gray-100" />
    </div>
  );
}

export default Divider;
