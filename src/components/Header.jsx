import { PrimaryButton } from "./button/Buttons";
import kanbanLogo from "../../public/Group 16.svg";
import { useBoardStore } from "../store/board-store.js";

const Header = () => {
  const boards = useBoardStore((state) => state.boards);
  const selectedBoardIndex = useBoardStore((state) => state.selectedBoardIndex);

  const selectedBoard = boards[selectedBoardIndex];

  return (
    <header className="h-[97px] flex items-center bg-white">
      <div className="w-[300px] border-r-[1px] border-linesLight h-full flex items-center justify-center">
        <img className="w-[152px] h-[25px]" src={kanbanLogo} alt="logo" />
      </div>
      <div className="flex justify-between w-full items-center px-[32px]">
        <p className="heading-xl text-black">
          {selectedBoard?.name || ""}
        </p>
        <span className="flex gap-[24px] justify-between">
          <PrimaryButton label="+ Add New Task" width="164px" height="48px" />
          <button className="kebab-menu text-[28px]" disabled>
            ⋮
          </button>
        </span>
      </div>
    </header>
  );
};

export default Header;
