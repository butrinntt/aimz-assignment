import React from "react";
import clsx from "clsx";
import { FaCheck } from "react-icons/fa";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  icon,
  className,
  checked,
  onChange,
  ...props
}) => {
  const combinedClasses = clsx(
    "flex items-center justify-center cursor-pointer",
    className
  );

  return (
    <label className={combinedClasses}>
      <div className="relative flex items-center">
        <input
          type="checkbox"
          className="cursor-pointer appearance-none w-5 h-5 border border-gray-400 rounded-sm
            checked:bg-sky-800 checked:border-sky-800 focus:outline-none
            dark:border-gray-600 dark:checked:bg-sky-600 dark:checked:border-sky-600"
          checked={checked}
          onChange={onChange}
          {...props}
        />

        {checked && (
          <span className="absolute inset-0 flex items-center justify-center text-white pointer-events-none">
            <FaCheck size={12} />
          </span>
        )}
      </div>
      <span className="flex items-center ml-2">
        {label} {icon && <span className="flex items-center">{icon}</span>}
      </span>
    </label>
  );
};

export default Checkbox;
