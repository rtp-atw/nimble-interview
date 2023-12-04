import { Button } from "@/components/Button";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { FC } from "react";
import { useGoogleSignin } from "@/hooks";

export const GoogleButton: FC<{ small?: boolean }> = ({ small }) => {
  const { t } = useTranslation("account");
  const { handleGoogleSignin, loading, error } = useGoogleSignin();
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const { access_token } = tokenResponse;
      handleGoogleSignin({ access_token });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (small) {
    return (
      <>
        <button
          className="inline-block bg-white rounded-full p-3 border fill-orange-500 border-orange-500 hover:bg-orange-500 hover:fill-white hover:text-white transition-colors duration-300"
          onClick={() => login()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18"
            viewBox="0 0 24 24"
            width="18"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
        </button>
      </>
    );
  }

  return (
    <>
      <button
        className="w-full flex items-center bg-white text-black border-black rounded-full p-[10px] pl-6 border fill-black-500 border-black-500 hover:shadow-lg transition-colors duration-500 mb-6"
        onClick={() => login()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="26"
          viewBox="0 0 24 24"
          width="26"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>

        <span className="px-4 text-center flex-1">{t("signInWithGoogle")}</span>
      </button>
    </>
  );
};
