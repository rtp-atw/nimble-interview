let _COOKIE_HOST = "";
let _BACKEND_HOST = "";

if (process.env.NEXT_PUBLIC_APP_STAGE === "production") {
  _COOKIE_HOST = process.env.NEXT_PUBLIC_COOKIE_HOST ?? ".atw.today";
  _COOKIE_HOST =
    process.env.NEXT_PUBLIC_BACKEND_HOST ?? "http://localhost:8000";
} else {
  _COOKIE_HOST = process.env.NEXT_PUBLIC_COOKIE_HOST ?? ".atw.today";
  _BACKEND_HOST =
    process.env.NEXT_PUBLIC_BACKEND_HOST ?? "http://localhost:8000";
}

export const COOKIE_HOST = _COOKIE_HOST;
export const BACKEND_HOST = _BACKEND_HOST;
