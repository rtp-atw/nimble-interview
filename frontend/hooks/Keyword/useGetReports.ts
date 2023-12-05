import useSWR from "swr";
import type { Key } from "swr";

import type { AxiosError } from "axios";

import type { Report } from "./types";

import { useAuthQuery } from "./fetcher";
import { useProfile } from "..";

export const useGetReports = () => {
  const { userJWT } = useProfile();

  const { fetcher } = useAuthQuery({
    jwt: userJWT,
  });

  const { isLoading, isValidating, error, data, mutate } = useSWR<
    Report[],
    AxiosError,
    Key,
    Record<string, any>
  >("/api/v1/keywords", fetcher, {
    refreshInterval: 0,
    revalidateIfStale: true,
    revalidateOnReconnect: true,
  });

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};
