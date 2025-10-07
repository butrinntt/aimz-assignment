import React, { useState } from "react";
import clsx from "clsx";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type CustomProps = {
  label?: string;
  className?: string;
  rootClassName?: string;
  error?: string;
  type?: string;
  isTextArea?: boolean;
  endIcon?: React.ReactNode;
  isDate?: boolean;
  isNumber?: boolean;
  isEmail?: boolean;
};

type InputProps = CustomProps & InputHTMLAttributes<HTMLInputElement>;
type TextAreaProps = CustomProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

type Props = InputProps | TextAreaProps;

const TextField: React.FC<Props> = ({
  label,
  className,
  type = "text",
  error,
  rootClassName = "mb-6",
  endIcon,
  isTextArea = false,
  isDate,
  isNumber,
  isEmail,
  disabled,
  ...props
}) => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isNumber) {
      const allowedKeys = [
        "Backspace",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
        "Delete",
      ];

      const target = event.target as HTMLInputElement;

      if (event.key === "+" && target.value.indexOf("+") === -1) {
        return;
      }

      const isNumberKey = /^[0-9]$/.test(event.key);
      if (!isNumberKey && !allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    }
  };

  const handleEmailValidation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (isEmail) {
      const value = event.target.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(
        value && !emailRegex.test(value) ? "Invalid email address" : null
      );
    }
  };

  return (
    <div className={rootClassName}>
      {label && (
        <label className="block text-left font-semibold mb-1 text-gray-900 dark:text-white">
          {label}
        </label>
      )}
      <div className="relative">
        {isTextArea ? (
          <textarea
            className={clsx(
              "w-full p-2 rounded-lg border resize-none placeholder:text-xs text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
              className,
              disabled
                ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400"
                : "bg-white dark:bg-gray-700",
              error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            )}
            disabled={disabled}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            type={
              isDate ? "date" : isNumber ? "text" : isEmail ? "email" : type
            }
            className={clsx(
              "w-full p-2 rounded-lg border placeholder:text-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
              className,
              disabled
                ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400"
                : "bg-white dark:bg-gray-700",
              error || emailError
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            )}
            onKeyDown={handleKeyDown}
            onChange={handleEmailValidation}
            disabled={disabled}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {endIcon && (
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            {endIcon}
          </span>
        )}
      </div>
      {(error || emailError) && (
        <p
          data-testid={
            "data-testid" in props
              ? `${props["data-testid"]}-error`
              : Math.random().toString()
          }
          className="text-red-500 dark:text-red-400 text-sm p-0 m-0"
        >
          {error || emailError}
        </p>
      )}
    </div>
  );
};

export default TextField;
