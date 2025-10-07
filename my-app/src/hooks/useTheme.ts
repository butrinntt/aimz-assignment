import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTheme,
  toggleTheme,
  type RootState,
  type ThemeMode,
} from "../store";
export default function useTheme() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);

  const toggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const set = useCallback(
    (mode: ThemeMode) => {
      dispatch(setTheme(mode));
    },
    [dispatch]
  );

  const isDark = theme === "dark";
  const isLight = theme === "light";

  return {
    theme,
    toggle,
    set,
    isDark,
    isLight,
  };
}
