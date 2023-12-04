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
              "bg-transparent hover:bg-t2a-orange",
              "border border-t2a-orange",
              "text-t2a-orange",
            ]
          : ["bg-t2a-orange", "border-none", "text-white", ,],
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
