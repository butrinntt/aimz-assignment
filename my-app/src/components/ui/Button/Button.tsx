import React from "react";
import clsx from "clsx";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center px-4 py-2 font-medium cursor-pointer",
        className
      )}
      {...props}
    >
      {startIcon && <span className="mr-2 flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2 flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
