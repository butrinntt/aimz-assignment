import React, { type ReactNode, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  style?: React.CSSProperties;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mx-4 relative py-4 w-auto">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
          {title && (
            <h3 className="font-bold pl-6 text-gray-900 dark:text-white">
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            aria-label="close"
            className="mr-6 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="mb-4 p-6 text-gray-700 dark:text-gray-300">
          {children}
        </div>
        {footer && (
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
