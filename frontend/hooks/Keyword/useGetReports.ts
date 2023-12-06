import useSWR from "swr";
import { useContext } from "react";

import { AuthenticationContext } from "@/src/contexts/Authentication";

import type { Key } from "swr";
import type { AxiosError } from "axios";

import type { Report } from "./types";

import { useAuthQuery } from "./fetcher";

export const useGetReports = () => {
  const ctx = useContext(AuthenticationContext);

  const { fetcher } = useAuthQuery({
    jwt: ctx.jwt,
  });

  const { isLoading, isValidating, error, data, mutate } = useSWR<
    Report[],
    AxiosError,
    Key,
    Record<string, any>
  >("/api/v1/reports", fetcher, {
    refreshInterval: 20 * 1000, // 10s
    revalidateIfStale: true,
    revalidateOnReconnect: true,
  });

  return {
    data,
    error,
    loading: isValidating || isLoading,
    mutate,
  };
};
