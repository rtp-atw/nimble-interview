import { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from "react";
import clsx, { ClassValue } from "clsx";

export type ContainerProps = {
  className?: ClassValue[] | string;
} & Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "className"
>;

export const Container: FunctionComponent<ContainerProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={clsx("tw-container", className)} {...rest}>
      {children}
    </div>
  );
};
export default Container;
