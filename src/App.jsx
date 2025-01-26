import "./App.css";
// import { useEffect } from "react";
// import { useTheme } from "./ThemeContext.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import SideBar from "./components/SideBar.jsx";
import Header from "./components/Header.jsx";
// import Modal from "./components/Modal.jsx";
import { useModalStore } from "./store/modal-store.js";

function App() {
  const isModalOpen = useModalStore((state) => state.isModalOpen);

  return (
    <div className={isModalOpen ? "pointer-events-none" : ""}>
      <Header />
      <div
        className="flex w-full"
        style={{ overflow: "hidden", overflowX: "scroll" }}
      >
        <div style={{}}>
          <SideBar />
        </div>
        <div
          style={{
            flexGrow: 1,
            overflowX: "auto",
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
