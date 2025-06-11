import useSWR from "swr";
import { useState, useCallback } from "react";
import { fetcher } from "@/lib/fetcher";

export function useCustomLoadingSWR(key: string, options = {}) {
  const { data, error, mutate, isValidating } = useSWR(key, fetcher, options);

  const [isLoading, setIsLoading] = useState(!data && !error); // начальная загрузка

  const refresh = useCallback(async () => {
    setIsLoading(true);
    await mutate(); // можно mutate(fetcher, { revalidate: true })
    setIsLoading(false);
  }, [mutate]);

  return {
    data,
    error,
    isLoading: isLoading || isValidating, // объединяем флаги
    refresh,
  };
}
