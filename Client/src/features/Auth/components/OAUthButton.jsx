export default function OAuthButton({ children, loading = false, onClick }) {
  return (
    <button
      type="button"
      disabled={loading}
      onClick={onClick}
      className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-95 transition disabled:opacity-60"
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
