import kanbanLogo from "../../public/Group 16.svg";
import AddTask from "./AddTask.jsx";
import DeleteBoard from "./DeleteBoard.jsx";
import { useBoardStore } from "../store/board-store.js";
import { useModalStore } from "../store/modal-store.js";
import { Toaster } from "sonner";

const Header = () => {
  const boards = useBoardStore((state) => state.boards);
  const selectedBoardIndex = useBoardStore((state) => state.selectedBoardIndex);
  const selectedBoard = boards[selectedBoardIndex];
  const openAddTaskModal = useModalStore((state) => state.openAddTaskModal);
  const openGenericModal = useModalStore((state) => state.openGenericModal);
  const currentModal = useModalStore((state) => state.currentModal);

  return (
    <div>
      <Toaster richColors />
      <header className="h-[97px] flex items-center bg-white">
        <div className="w-[300px] border-r-[1px] border-linesLight h-full flex items-center justify-center">
          <img className="w-[152px] h-[25px]" src={kanbanLogo} alt="logo" />
        </div>
        <div className="flex justify-between w-full items-center px-[32px]">
          <p className="heading-xl text-black">{selectedBoard?.name || ""}</p>
          <span className="flex gap-[24px] justify-between">
            <button
              className="px-[25px] py-[15px] btn btn-primary"
              onClick={openAddTaskModal}
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
      <AddTask />
      {currentModal === "deleteBoard" && <DeleteBoard />}
    </div>
  );
};

export default Header;
