import useSWRMutation from "swr/mutation";

import type { Key } from "swr";

import { useAuthMutation } from "./fetcher";

import type { AxiosError } from "axios";

import type { UploadResponse } from "./types";

export type UploadKeywordRequest = {
  file: File;
  jwt?: string;
};

export const useUploadKeywords = () => {
  const { fetcher } = useAuthMutation();

  const { trigger, isMutating, error } = useSWRMutation<
    UploadResponse,
    AxiosError,
    Key,
    UploadKeywordRequest
  >("/api/v1/keywords/upload", fetcher<UploadResponse>, {
    onSuccess: (data, key, config) => {},
  });

  return {
    handleUpload: trigger,
    loading: isMutating,
    error,
  };
};
