import clsx from "clsx";

import type { FC, DetailedHTMLProps, ButtonHTMLAttributes } from "react";

type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonProps = {
  ghost?: boolean;
  round?: boolean;
  small?: boolean;
  block?: boolean;
} & DetailedHTMLProps<ButtonAttributes, HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
  id,
  ghost = false,
  round = false,
  small = false,
  block = true,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        "flex items-center justify-center",
        block ? "w-full" : "w-auto",
        small && ["px-4 py-2", "text-xs"],
        !small && ["px-4 py-3.5"],
        ghost
          ? [
              "bg-transparent hover:bg-blue-600",
              "border border-blue-500",
              "text-blue-500",
            ]
          : ["bg-blue-500 hover:bg-blue-600", "border-none", "text-white", ,],
        round ? "rounded-full" : "rounded-lg",
        "disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-blue-500",
        "hover:shadow-lg",
        "transition-all duration-200 ease-in",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
