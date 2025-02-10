import Board from "./Board";
import { useBoardStore } from "../store/board-store.js";
import hideIcon from "/hide-icon.svg";
import { useEffect, useState } from "react";
import SideBarModal from "./SideBarModal.jsx";

const SideBar = () => {
  const boards = useBoardStore((state) => state.boards);
  const closeSideBar = useBoardStore((state) => state.closeSideBar);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <>
      {isMobile ? (
        <SideBarModal>
          <p className="ml-[24px] font-bold text-mediumGray text-[12px] mb-[19px]">ALL BOARDS ({boards.length})</p>
          <Board/>
        </SideBarModal>
      ) : (
        <div className="w-[214px] md:w-[261px] h-full bg-white border-r-[1px] border-linesLight pt-[24px] flex flex-col">
          <p className="ml-[32px] md:ml-[24px] font-bold text-mediumGray text-[12px] mb-[19px]">
            ALL BOARDS ({boards.length})
          </p>
          <Board />
          <div className="mt-auto px-[24px] mb-[45px] flex flex-col">
            <span
              className="flex gap-[15px] items-center heading-medium cursor-pointer"
              onClick={closeSideBar}
            >
              <img src={hideIcon} alt="" className="w-[18px] h-[16px]" />
              <p>Hide Sidebar</p>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
