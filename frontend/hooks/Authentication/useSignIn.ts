import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

import { Cookie } from "@/utils/cookie";

import type { AxiosError } from "axios";
import type { Key } from "swr";

import { useAuthMutation } from "./fetcher";

import { COOKIE_KEY, type SignInResponse } from "./types";

export type SignInRequest = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  const router = useRouter();
  const { fetcher } = useAuthMutation();

  const { trigger, isMutating, error } = useSWRMutation<
    SignInResponse,
    AxiosError,
    Key,
    SignInRequest
  >("/api/v1/users/signin", fetcher<SignInResponse>, {
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
        pathname: "/upload",
        query: {
          next: nextPath,
        },
      });
    },
  });

  return {
    handleSignIn: trigger,
    loading: isMutating,
    error,
  };
};
