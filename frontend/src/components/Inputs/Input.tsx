import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import type {
  FC,
  DetailedHTMLProps,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from "react";

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;
type LabelAttributes = LabelHTMLAttributes<HTMLLabelElement>;

type LabelProps = DetailedHTMLProps<LabelAttributes, HTMLLabelElement>;
type InputProps = {
  label?: string | ReactNode;
  labelOptions?: LabelProps;
  block?: boolean;
  round?: boolean;
  wrapClassName?: string;
  labelClassName?: string;
  error?: string;
  suffix?: ReactNode;
} & DetailedHTMLProps<InputAttributes, HTMLInputElement>;

export const Input: FC<InputProps> = ({
  id,
  error,
  className,
  wrapClassName,
  labelClassName,
  block = true,
  round = true,
  type,
  label,
  labelOptions,
  suffix,
  disabled,
  ...rest
}) => {
  const [inputType, setInputType] = useState<InputAttributes["type"]>(type);

  const isPasswordType = type === "password";
  const isHidden = type === "hidden";
  const isRenderSuffix = suffix || isPasswordType;

  const handleRevealPassword = () => {
    setInputType((prev) => {
      if (prev === "password") return "text";
      return "password";
    });
  };

  return (
    <div className={clsx(wrapClassName)}>
      <label
        {...labelOptions}
        className={clsx(
          "block",
          !isHidden && "mb-1",
          "text-xs text-gray-900 font-bold",
          labelClassName
        )}
      >
        {label}
      </label>
      <div className={clsx("relative")}>
        <input
          id={id}
          type={inputType}
          className={clsx(
            "relative z-30",
            [block && "block w-full", round && "rounded-full"],
            ["border", "focus:ring-1 focus:outline-0"],
            ["py-3.5 px-6", isPasswordType && "pr-[48px]"],
            "text-xs leading-normal font-bold placeholder:text-gray-400",
            ["transition-all duration-400 ease-in"],
            disabled && "opacity-80",
            !error && [
              "border-t2a-gray-border",
              "focus:border-t2a-orange focus:ring-t2a-orange",
            ],
            error && [
              "border-t2a-error mb-2",
              "focus:border-t2a-error focus:ring-t2a-error",
            ],
            className
          )}
          disabled={disabled}
          {...rest}
        />
        <p
          className={clsx(
            ["absolute z-0 -bottom-4", "transform"],
            ["transition-transform duration-400 delay-0", "transition-opacity"],
            error
              ? ["-translate-y-0 opacity-100"]
              : ["-translate-y-3 opacity-0"],
            "text-[10px] font-bold",
            "text-t2a-error"
          )}
        >
          {error ?? <span className="opacity-0">;</span>}
        </p>
        {isRenderSuffix && (
          <div
            onClick={isPasswordType ? handleRevealPassword : undefined}
            className={clsx(
              "absolute z-40",
              "top-1/2 -translate-y-1/2 right-4",
              "cursor-pointer"
            )}
          >
            {isPasswordType && (
              <Image
                src={
                  inputType === "password"
                    ? "/assets/icons/eye-close.svg"
                    : "/assets/icons/eye-open.svg"
                }
                alt="icon-reveal-password"
                width={18}
                height={18}
                quality={100}
                unoptimized
              />
            )}
            {!isPasswordType && suffix}
          </div>
        )}
      </div>
    </div>
  );
};
