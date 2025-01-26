import Board from "./Board";
import { useBoardStore } from "../store/board-store.js";

const SideBar = () => {
  const boards = useBoardStore((state) => state.boards);

  return (
    <div className="w-[240px] h-full bg-white border-r-[1px] border-linesLight mt-[24px]">
      <p className="ml-[32px] font-bold text-mediumGray text-[12px] mb-[19px]">
        ALL BOARDS ({boards.length})
      </p>
      <Board />
    </div>
  );
};

export default SideBar;
