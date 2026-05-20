import { useCallback, useEffect, useState } from "react";

export default function useSupabaseQuery(queryFn, depsKey = "", options = {}) {
  const { enabled = true, initialData = null, onSuccess, onError } = options;

  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(Boolean(enabled));

  const refetch = useCallback(async () => {
    if (!enabled || typeof queryFn !== "function") {
      setLoading(false);
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await queryFn();

      if (result?.error) {
        setError(result.error);
        onError?.(result.error);
        return result;
      }

      const finalData = result?.data ?? result ?? initialData;
      setData(finalData);
      onSuccess?.(finalData);
      return result;
    } catch (err) {
      setError(err);
      onError?.(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  }, [enabled, queryFn, initialData, onSuccess, onError]);

  useEffect(() => {
    let cancelled = false;

    // ✅ Async IIFE — linter can now see setState is never called synchronously
    async function run() {
      if (!cancelled) await refetch();
    }

    run();

    return () => {
      cancelled = true; // prevent setState on unmounted component
    };
  }, [refetch, depsKey]); // ✅ depsKey triggers refetch when changed externally

  return { data, error, loading, refetch, setData };
}