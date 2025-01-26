import { useEffect } from "react";
import { useTheme } from "../ThemeContext";
import Column from "../components/Column";

const LandingPage = () => {
  const { darkMode } = useTheme();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <main className="bg-lightGrey flex gap-4 p-[24px] h-auto min-h-screen">
     <Column/>
    </main>
  );
};

export default LandingPage;
