import GenericModal from "./GenericModal";
import { useBoardStore } from "../store/board-store.js";
import { useModalStore } from "../store/modal-store.js";
import { Toaster, toast } from "sonner";

const DeleteBoard = () => {
  const boards = useBoardStore((state) => state.boards);
  const deleteBoard = useBoardStore((state) => state.deleteBoard);
  const closeGenericModal = useModalStore((state) => state.closeGenericModal)
  const selectedBoardIndex = useBoardStore((state) => state.selectedBoardIndex);

  const selectedBoard = boards[selectedBoardIndex];

  const handleDeleteBoard = () => {
    deleteBoard(selectedBoardIndex);
    closeGenericModal();
    toast.success('Board deleted sucessfully')
  };

  return (
    <GenericModal>
      <Toaster richColors />
      <h1 className="heading-large text-red">Delete this board?</h1>
      <p className="my-[24px] body-large text-mediumGray">{`Are you sure you want to delete the '${selectedBoard?.name}' board? This action cannot be reversed.`}</p>
      <span className="flex gap-[16px] w-full">
        <button
          className="btn btn-destructive text-white py-[9px] w-[50%] font-bold"
            onClick={handleDeleteBoard}
        >
          Delete
        </button>
        <button
          className="btn btn-secondary text-purple py-[9px] w-[50%] font-bold"
            onClick={closeGenericModal}
        >
          Cancel
        </button>
      </span>
    </GenericModal>
  );
};

export default DeleteBoard;
