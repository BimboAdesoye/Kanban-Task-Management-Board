import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("dark-mode") === "enabled";
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    localStorage.setItem("dark-mode", darkMode ? "enabled" : "disabled");
  }, [darkMode]);


  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={darkMode ? "dark-mode" : ""}>{children}</div>
    </ThemeContext.Provider>
  );
};
