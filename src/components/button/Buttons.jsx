/* eslint-disable react/prop-types */
import { useTheme } from "../../ThemeContext.jsx";

export const PrimaryButton = ({ children, paddingInline, paddingBlock }) => {
  const { darkMode } = useTheme();

  return (
    <button
      className={`btn btn-primary heading-medium text-white  ${
        darkMode ? "dark-mode" : ""
      }`}
      style={{ paddingInline, paddingBlock }}
    >
      {children}
    </button>
  );
};
export const SecondaryButton = ({ label }) => {
  const { darkMode } = useTheme();

  return (
    <button
      className={`btn btn-secondary heading-medium text-white ${
        darkMode ? "dark-mode" : ""
      }`}
    >
      {label}
    </button>
  );
};
export const DestructiveButton = ({ label }) => {
  const { darkMode } = useTheme();

  return (
    <button
      className={`btn btn-destructive heading-medium text-white ${
        darkMode ? "dark-mode" : ""
      }`}
    >
      {label}
    </button>
  );
};
