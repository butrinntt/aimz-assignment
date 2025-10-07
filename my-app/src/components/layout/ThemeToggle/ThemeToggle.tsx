import { FaMoon, FaSun, FaAdjust } from "react-icons/fa";
import { useTheme } from "../../../hooks";

export default function ThemeToggle() {
  const { theme, toggle, isDark, isLight } = useTheme();

  return (
    <button
      onClick={toggle}
      className={`
        fixed top-6 right-6 z-50
        flex items-center justify-center
        w-12 h-12 rounded-full
        shadow-lg backdrop-blur-sm
        border transition-all duration-300 ease-in-out
        hover:scale-110 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${
          isDark
            ? "bg-gray-800 border-gray-700 text-yellow-300 hover:bg-gray-700 focus:ring-yellow-400"
            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 focus:ring-blue-500"
        }
      `}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      title={`Current: ${theme} mode - Click for ${
        isLight ? "dark" : "light"
      } mode`}
    >
      <div className="relative flex items-center justify-center">
        {/* Sun icon for light mode */}
        <FaSun
          className={`
            absolute transition-all duration-300 ease-in-out
            ${
              isLight
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 rotate-90 scale-0"
            }
          `}
          size={18}
        />

        {/* Moon icon for dark mode */}
        <FaMoon
          className={`
            absolute transition-all duration-300 ease-in-out
            ${
              isDark
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-90 scale-0"
            }
          `}
          size={18}
        />

        {/* Loading/transition state */}
        <FaAdjust
          className={`
            absolute transition-opacity duration-200 ease-in-out
            ${isLight || isDark ? "opacity-0" : "opacity-100"}
          `}
          size={18}
        />
      </div>

      {/* Optional: Ripple effect on hover */}
      <span className="absolute inset-0 rounded-full bg-current opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
    </button>
  );
}
