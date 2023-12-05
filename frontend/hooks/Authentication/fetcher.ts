import axios, { AxiosError, type AxiosResponse } from "axios";

import { BACKEND_HOST } from "@/utils/variables";

export const useAuthMutation = () => {
  return {
    fetcher: async <T>(
      url: string,
      { arg }: Record<string, any>
    ): Promise<T> => {
      return authMutationWithJWT(url, { arg });
    },
  };
};

const authMutationWithJWT = async <T>(
  url: string,
  { arg }: Record<string, any>,
  headers: Record<string, any> = {}
): Promise<T> => {
  const { jwt = "", ...body } = arg;
  return await axios<
    T,
    AxiosResponse<T, Record<string, any>>,
    Record<string, any>
  >({
    baseURL: BACKEND_HOST,
    method: "POST",
    url,
    headers: {
      ...headers,
      Authorization: `${arg.jwt}`,
    },
    data: body,
  })
    .then((response) => response.data as T)
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        throw err;
      }
      throw new AxiosError(err.message, "500");
    });
};
