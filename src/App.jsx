import "./App.css";
// import { useEffect } from "react";
// import { useTheme } from "./ThemeContext.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import SideBar from "./components/SideBar.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <div>
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
            border: "1px solid red",
          }}
        >
          <LandingPage />
        </div>
      </div>
    </div>
  );
}

export default App;
