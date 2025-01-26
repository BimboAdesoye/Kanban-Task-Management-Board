/* eslint-disable react/prop-types */
import GenericModal from "./GenericModal.jsx";
import { useModalStore } from "../store/modal-store.js";
import { useBoardStore } from "../store/board-store.js";
import { Toaster, toast } from "sonner";

const DeleteTask = () => {
  const closeCurrentModal = useModalStore((state) => state.closeCurrentModal);
  const selectedTask = useModalStore((state) => state.selectedTask);
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const selectedBoardIndex = useBoardStore((state) => state.selectedBoardIndex);

  const handleDeleteTask = () => {
    deleteTask(selectedBoardIndex, selectedTask?.id);
    closeCurrentModal();
    toast.success("Task deleted successfully.");
  };

  return (
    <GenericModal>
      <Toaster richColors />
      <h1 className="heading-large text-red">Delete this task?</h1>
      <p className="my-[24px] body-large text-mediumGray">{`Are you sure you want to delete the '${selectedTask?.title}' task and its subtasks? This action cannot be reversed.`}</p>
      <span className="flex gap-[16px] w-full">
        <button
          className="btn btn-destructive text-white py-[9px] w-[50%] font-bold"
          onClick={handleDeleteTask}
        >
          Delete
        </button>
        <button
          className="btn btn-secondary text-purple py-[9px] w-[50%] font-bold"
          onClick={closeCurrentModal}
        >
          Cancel
        </button>
      </span>
    </GenericModal>
  );
};

export default DeleteTask;
