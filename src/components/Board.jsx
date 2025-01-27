import { useBoardStore } from "../store/board-store.js";
import boardIcon from "/fluent_board-split-24-regular.svg";
import boardIconGray from "/board-icongray.png";
import boardIconBlue from "/board-icon-blue.svg";
import { useModalStore } from "../store/modal-store.js";
import AddBoard from "./AddBoard.jsx";

const Board = () => {
  const boards = useBoardStore((state) => state.boards);
  const selectedBoardIndex = useBoardStore((state) => state.selectedBoardIndex);
  const setSelectedBoardIndex = useBoardStore(
    (state) => state.setSelectedBoardIndex
  );
  const openGenericModal = useModalStore((state) => state.openGenericModal);
  const currentModal = useModalStore((state) => state.currentModal);

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
      <button
        onClick={() => openGenericModal("addBoard")}
        className="pt-[14px] pb-[15px] w-[95%] flex border-none outline-none"
      >
        <img className="ml-[32px] mr-[16px]" src={boardIconBlue} alt="" />
        <p className="heading-medium text-purple">+ Create New Board</p>
      </button>
      {currentModal === "addBoard" && <AddBoard />}
    </div>
  );
};

export default Board;
