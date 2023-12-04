import clsx from "clsx";

import type { FC, DetailedHTMLProps, ButtonHTMLAttributes } from "react";

type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonProps = {
  ghost?: boolean;
  round?: boolean;
} & DetailedHTMLProps<ButtonAttributes, HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
  id,
  ghost,
  round,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        "flex items-center justify-center",
        "w-full",
        "px-4 py-3.5",
        ghost
          ? [
              "bg-transparent hover:bg-blue-600",
              "border border-blue-500",
              "text-blue-500",
            ]
          : ["bg-blue-500 hover:bg-blue-600", "border-none", "text-white", ,],
        round ? "rounded-full" : "rounded-lg",
        "disabled:cursor-wait disabled:opacity-60",
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
