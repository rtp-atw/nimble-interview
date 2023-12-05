import axios, { AxiosError, type AxiosResponse } from "axios";

import { BACKEND_HOST } from "@/utils/variables";
import { useProfile } from "..";

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
export const useAuthQuery = (arg: Record<string, any>) => {
  return {
    fetcher: async <T>(url: string): Promise<T> => {
      return authQueryWithJWT(url, arg);
    },
  };
};

const authMutationWithJWT = async <T>(
  url: string,
  { arg }: Record<string, any>,
  headers: Record<string, any> = {}
): Promise<T> => {
  const { jwt = "", file, ...body } = arg;
  const payload = { ...body };

  if (file) {
    if (file instanceof File) {
      headers["Content-Type"] = "multipart/form-data";
      payload.file = file;
    }
  }

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
    data: payload,
  })
    .then((response) => response.data as T)
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        throw err;
      }
      throw new AxiosError(err.message, "500");
    });
};

export const authQueryWithJWT = async <T>(
  url: string,
  arg: Record<string, any>
): Promise<T> => {
  console.log("arg", arg);

  return await axios<
    T,
    AxiosResponse<T, Record<string, any>>,
    Record<string, any>
  >({
    baseURL: BACKEND_HOST,
    method: "GET",
    url,
    headers: {
      Authorization: `${arg.jwt}`,
    },
  })
    .then((response) => response.data as T)
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        throw err;
      }
      throw new AxiosError(err.message, "500");
    });
};
