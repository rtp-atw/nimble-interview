import { useIsEn } from "@/hooks";
import clsx from "clsx";
import Link from "next/link";

import { PropsWithChildren, type FC } from "react";

type AuthLayoutProps = {
  title?: string;
  subTitle?: string;
  isWelcome?: boolean;
  titleClassName?: string;
  noSplit?: boolean;
  noLogo?: boolean;
  className?: string;
};
export const AuthLayout: FC<PropsWithChildren<AuthLayoutProps>> = ({
  title,
  subTitle,
  isWelcome,
  titleClassName,
  noSplit,
  noLogo,
  className,
  children,
}) => {
  const isEn = useIsEn();
  const isRenderTitle = title && subTitle && !isWelcome;

  return (
    <div className={clsx("grid grid-flow-row grid-cols-2", "min-h-screen")}>
      {!noSplit && (
        <div
          className={clsx(
            "hidden",
            "relative",
            "lg:block lg:col-span-1",
            "bg-[url(/assets/sign-in-bg.webp)] bg-center bg-cover bg-no-repeat"
          )}
        ></div>
      )}
      <div
        className={clsx(
          ["col-span-2", !noSplit && "lg:col-span-1"],
          "flex",
          "justify-center items-center",
          "px-4"
        )}
      >
        <div
          className={clsx(
            "flex flex-col py-10",
            "max-w-[280px]",
            "w-full h-full",
            className
          )}
        >
          {!noLogo && (
            <div className={clsx("relative", "mb-6")}>
              <a href={`/${isEn ? "" : "th"}`}>
                <img
                  className={clsx(
                    "mx-auto w-auto",
                    isWelcome ? "w-auto  h-[88px]" : "w-auto h-[48px]"
                  )}
                  src={
                    isWelcome
                      ? "/assets/logo-t2a-welcome.png"
                      : "https://www.ticket2attraction.com/Assets/web-logo.png"
                  }
                  alt="Ticket2Attraction Logo"
                />
              </a>
            </div>
          )}
          {isRenderTitle && (
            <div className={clsx("mb-10", "text-base", titleClassName)}>
              <p className={clsx("text-lg leading-normal font-bold", "mb-0")}>
                {title}
              </p>
              {subTitle}
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};
