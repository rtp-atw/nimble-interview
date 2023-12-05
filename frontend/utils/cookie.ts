import * as cookie from "cookies-next";

import type { OptionsType } from "cookies-next/lib/types";

export const Cookie = {
  set: (key: string, value: any, options?: OptionsType) => {
    cookie.setCookie(key, value, options);
  },
  get: (key: string) => {
    return cookie.getCookie(key);
  },
  remove: (key: string) => {
    return cookie.deleteCookie(key);
  },
};
