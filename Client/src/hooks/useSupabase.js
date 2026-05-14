import { useCallback, useEffect, useState } from "react";

export default function useSupabaseQuery(queryFn, deps = [], options = {}) {
  const {
    enabled = true,
    initialData = null,
    onSuccess,
    onError,
  } = options;

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
        setLoading(false);
        return result;
      }

      const finalData = result?.data ?? result ?? initialData;

      setData(finalData);
      onSuccess?.(finalData);
      setLoading(false);

      return result;
    } catch (err) {
      setError(err);
      onError?.(err);
      setLoading(false);

      return {
        data: null,
        error: err,
      };
    }
  }, deps);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    data,
    error,
    loading,
    refetch,
    setData,
  };
}