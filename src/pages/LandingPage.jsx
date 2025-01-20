import { useEffect } from "react";
import { useTheme } from "../ThemeContext";

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
    <main className="bg-lightGrey flex gap-4 p-[24px] h-screen ">
      <div className="h-[400px] w-[300px] bg-white border-[1px] border-linesLight">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga porro
        accusantium quis, voluptate optio animi ipsum dolore sed magnam voluptas
        dolorem earum nam recusandae minus adipisci, fugit atque, commodi ea?
      </div>
      <div className="h-[400px] w-[300px] bg-white border-r-[1px] border-linesLight">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga porro
        accusantium quis, voluptate optio animi ipsum dolore sed magnam voluptas
        dolorem earum nam recusandae minus adipisci, fugit atque, commodi ea?
      </div>
      <div className="h-[400px] w-[300px] bg-white border-r-[1px] border-linesLight">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga porro
        accusantium quis, voluptate optio animi ipsum dolore sed magnam voluptas
        dolorem earum nam recusandae minus adipisci, fugit atque, commodi ea?
      </div>
      <div className="h-[400px] w-[300px] bg-white border-r-[1px] border-linesLight">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga porro
        accusantium quis, voluptate optio animi ipsum dolore sed magnam voluptas
        dolorem earum nam recusandae minus adipisci, fugit atque, commodi ea?
      </div>
      <div className="h-[400px] w-[300px] bg-white border-r-[1px] border-linesLight">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga porro
        accusantium quis, voluptate optio animi ipsum dolore sed magnam voluptas
        dolorem earum nam recusandae minus adipisci, fugit atque, commodi ea?
      </div>
    </main>
  );
};

export default LandingPage;
