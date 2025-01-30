import { useEffect } from "react";
import { useTheme } from "../ThemeContext";
import Column from "../components/Column";
import { useBoardStore } from "../store/board-store";
import { useModalStore } from "../store/modal-store";
import EditBoard from "../components/EditBoard";

const LandingPage = () => {
  const boards = useBoardStore((state) => state.boards);
  const selectedBoardIndex = useBoardStore((state) => state.selectedBoardIndex);
  const openGenericModal = useModalStore((state) => state.openGenericModal);
  const currentModal = useModalStore((state) => state.currentModal);
  const { darkMode } = useTheme();

  const getColumns = () => {
    if (!boards.length || selectedBoardIndex === null) return [];
    const selectedBoard = boards[selectedBoardIndex];
    return selectedBoard.columns || [];
  };

  const columnsLength = getColumns().length;

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <main
      className={`bg-lightGrey flex gap-4 p-[24px] h-auto min-h-screen 
        ${columnsLength > 0 ? "" : "justify-center items-center"}  `}
    >
      {columnsLength > 0 ? (
        <Column />
      ) : (
        <div className="flex flex-col items-center gap-[32px]">
          <p className="heading-large text-mediumGray">
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
    </main>
  );
};

export default LandingPage;
