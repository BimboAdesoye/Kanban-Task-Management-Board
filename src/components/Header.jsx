import kanbanLogo from "/Group 16.svg";
import AddTask from "./AddTask.jsx";
import DeleteBoard from "./DeleteBoard.jsx";
import { useBoardStore } from "../store/board-store.js";
import { useModalStore } from "../store/modal-store.js";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import kanbanIcon from "/kanban-icon.svg";
import dropdownIcon from "/dropdown-icon.svg";
import addIcon from "/add-icon.svg";
import SideBar from "./SideBar.jsx";

const Header = () => {
  const boards = useBoardStore((state) => state.boards);
  const selectedBoardIndex = useBoardStore((state) => state.selectedBoardIndex);
  const selectedBoard = boards[selectedBoardIndex];
  const openAddTaskModal = useModalStore((state) => state.openAddTaskModal);
  const openGenericModal = useModalStore((state) => state.openGenericModal);
  const toggleSideBarModal = useModalStore((state) => state.toggleSideBarModal);
  const currentModal = useModalStore((state) => state.currentModal);
  const isSideBarOpen = useBoardStore((state) => state.isSideBarOpen);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const getColumns = () => {
    if (!boards.length || selectedBoardIndex === null) return [];
    return selectedBoard.columns || [];
  };

  const columnsLength = getColumns().length;

  return (
    <div>
      <Toaster richColors />
      {isMobile ? (
        <header className="bg-white w-full h-[64px] flex items-center justify-between px-[16px]">
          <div className="flex gap-[16px]">
            <img src={kanbanIcon} alt="" />
            <span
              className="flex items-center gap-[8px]"
              onClick={() => toggleSideBarModal("sideBar")}
            >
              <p className="heading-large text-black">
                {" "}
                {selectedBoard?.name || ""}
              </p>
              <img className="w-[8px] h-[10px]" src={dropdownIcon} alt="" />
            </span>
          </div>
          <div className="flex gap-[8px]">
            <button
              disabled={columnsLength < 1}
              onClick={openAddTaskModal}
              className={`bg-purple text-white px-[20px] py-[10px] rounded-[20px] flex items-center justify-center ${
                columnsLength < 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <img className="w-[12px] h-[12px]" src={addIcon} alt="" />
            </button>
            <button
              className="kebab-menu text-[28px] cursor-pointer"
              onClick={() => openGenericModal("deleteBoard")}
            >
              ⋮
            </button>
          </div>
        </header>
      ) : (
        <header className="h-[97px] flex items-center bg-white">
          <div
            className={`border-r-[1px] border-linesLight h-full flex items-center justify-left flex-none ${
              isSideBarOpen
                ? "w-[300px] md:w-[261px]"
                : "w-[211px] md:w-[201px]"
            }`}
          >
            <img
              className="w-[152px] h-[25px] md:w-[152.53px] md:h-[25.22px] ml-[34px] md:ml-[26px]"
              src={kanbanLogo}
              alt="logo"
            />
          </div>
          <div className="flex justify-between w-full items-center px-[32px] md:px-[24px]">
            <p className="heading-xl text-black md:text-[20px]">
              {selectedBoard?.name || ""}
            </p>
            <span className="flex gap-[24px] justify-between">
              <button
                disabled={columnsLength < 1}
                onClick={openAddTaskModal}
                className={`px-[25px] py-[15px] mx-[20px] btn btn-primary ${
                  columnsLength < 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <p className="heading-medium text-white">+ Add New Task</p>
              </button>
              <button
                className="kebab-menu text-[28px] cursor-pointer"
                onClick={() => openGenericModal("deleteBoard")}
              >
                ⋮
              </button>
            </span>
          </div>
        </header>
      )}
      <AddTask />
      {currentModal === "deleteBoard" && <DeleteBoard />}
      {currentModal === "sideBar" && <SideBar />}
    </div>
  );
};

export default Header;
