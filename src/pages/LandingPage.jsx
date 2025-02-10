import Column from "../components/Column";
import { useBoardStore } from "../store/board-store";
import { useModalStore } from "../store/modal-store";
import EditBoard from "../components/EditBoard";
import { DragDropContext } from "@hello-pangea/dnd";
import showIcon from "/show-icon.svg";

const LandingPage = () => {
  const boards = useBoardStore((state) => state.boards);
  const selectedBoardIndex = useBoardStore((state) => state.selectedBoardIndex);
  const openGenericModal = useModalStore((state) => state.openGenericModal);
  const currentModal = useModalStore((state) => state.currentModal);
  const onDragEnd = useBoardStore((state) => state.onDragEnd);
  const isSideBarOpen = useBoardStore((state) => state.isSideBarOpen);
  const openSideBar = useBoardStore((state) => state.openSideBar);

  const getColumns = () => {
    if (!boards.length || selectedBoardIndex === null) return [];
    const selectedBoard = boards[selectedBoardIndex];
    return selectedBoard.columns || [];
  };

  const columnsLength = getColumns().length;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main
        className={`bg-lightGrey flex gap-4 p-[24px] h-auto min-h-screen min-w-full overflow-auto
        ${columnsLength > 0 ? "" : "justify-center items-center"}  relative`}
      >
        {columnsLength > 0 ? (
          <Column />
        ) : (
          <div className="flex flex-col items-center gap-[32px]">
            <p className="heading-large text-mediumGray text-center">
              This board is empty. Create a new column to get started.
            </p>
            <button
              className="btn btn-primary py-[9px] mt-[] w-full max-w-[174px] heading-medium text-white"
              onClick={() => openGenericModal("editBoard")}
            >
              +Add New Column
            </button>
          </div>
        )}
        {currentModal === "editBoard" && <EditBoard />}
        {!isSideBarOpen && (
          <button onClick={openSideBar} className="w-[56px] h-[48px]  bg-purple flex items-center justify-center rounded-tr-[30px] rounded-br-[30px] absolute left-0 bottom-8">
            <img src={showIcon} alt="" />
          </button>
        )}
      </main>
    </DragDropContext>
  );
};

export default LandingPage;
