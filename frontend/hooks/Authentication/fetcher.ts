import axios, { AxiosError, AxiosResponse } from "axios";

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

const authMutation = async <T>(
  url: string,
  { arg }: Record<string, any>,
  headers: Record<string, any> = {}
): Promise<T> => {
  return await axios<
    T,
    AxiosResponse<T, Record<string, any>>,
    Record<string, any>
  >({
    method: "POST",
    url,
    data: arg,
    headers,
  })
    .then((response) => response.data)
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        throw err;
      }
      throw new AxiosError(err.message, "500");
    });
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
    method: "POST",
    url,
    headers: {
      ...headers,
      Authorization: `Bearer ${arg.jwt}`,
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
