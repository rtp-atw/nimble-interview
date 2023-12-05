import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

import { Cookie } from "@/utils/cookie";

import type { Key } from "swr";

import { useAuthMutation } from "./fetcher";

import type { AxiosError } from "axios";

import { COOKIE_KEY } from "./types";
import type { SignUpResponse } from "./types";

export type SignUpRequest = {
  email: string;
  password: string;
};

export const useSignUp = () => {
  const router = useRouter();
  const { fetcher } = useAuthMutation();

  const { trigger, isMutating, error } = useSWRMutation<
    SignUpResponse,
    AxiosError,
    Key,
    SignUpRequest
  >("/api/v1/users/signup", fetcher<SignUpResponse>, {
    onSuccess: (data, key, config) => {
      // SET UP
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      Cookie.set(COOKIE_KEY, data.token, { expires: nextWeek });

      let nextPath = "/";
      if (router.query.next) {
        nextPath = router.query.next as string;
      }
      router.push({
        pathname: "/users/upload",
        query: {
          next: nextPath,
        },
      });
    },
  });

  return {
    handleSignUp: trigger,
    loading: isMutating,
    error,
  };
};
