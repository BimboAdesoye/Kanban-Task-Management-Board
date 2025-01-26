import { useBoardStore } from "../store/board-store.js";
import boardIcon from "/fluent_board-split-24-regular.svg";
import boardIconGray from "/board-icongray.png";

const Board = () => {
  const boards = useBoardStore((state) => state.boards);
  const selectedBoardIndex = useBoardStore((state) => state.selectedBoardIndex);
  const setSelectedBoardIndex = useBoardStore(
    (state) => state.setSelectedBoardIndex
  );

  return (
    <div className="flex flex-col">
      {boards.map((board, boardIndex) => {
        const isSelected = selectedBoardIndex === boardIndex;
        return (
          <button
            className={`pt-[14px] pb-[15px] w-[95%] flex border-none outline-none ${
              isSelected ? " bg-purple rounded-r-[30px]" : ""
            }`}
            key={boardIndex}
            onClick={() => setSelectedBoardIndex(boardIndex)}
          >
            <img
              className="ml-[32px] mr-[16px]"
              src={isSelected ? boardIcon : boardIconGray}
              alt=""
            />
            <p
              className={`heading-medium ${
                isSelected ? "text-white" : "text-mediumGray"
              } `}
            >
              {board.name}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default Board;
