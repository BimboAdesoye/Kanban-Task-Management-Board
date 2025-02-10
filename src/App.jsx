import "./App.css";
import LandingPage from "./pages/LandingPage.jsx";
import SideBar from "./components/SideBar.jsx";
import Header from "./components/Header.jsx";
import { useModalStore } from "./store/modal-store.js";
import { useBoardStore } from "./store/board-store.js";
import { useEffect, useState } from "react";

function App() {
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const isSideBarOpen = useBoardStore((state) => state.isSideBarOpen);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div className={isModalOpen ? "pointer-events-none" : ""}>
      <Header />
      <div
        className="flex w-full scrollbar-none"
        style={{ overflow: "hidden", overflowX: "scroll" }}
      >
        <div>{isSideBarOpen && !isMobile && <SideBar />}</div>
        <div
          style={{
            flexGrow: 1,
            overflowX: "auto",
            width: "100%",
            // border: "1px solid red",
          }}
        >
          <LandingPage />
        </div>
      </div>
    </div>
  );
}

export default App;
