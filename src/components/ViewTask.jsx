/* eslint-disable react/prop-types */
// import Modal from "./Modal";
import GenericModal from "./GenericModal";
import { useModalStore } from "../store/modal-store.js";
import { useBoardStore } from "../store/board-store.js";

const ViewTask = ({ task }) => {
  const selectedTask = useModalStore((state) => state.selectedTask);
  const openGenericModal = useModalStore((state) => state.openGenericModal);
  // const closeModal = useModalStore((state) => state.closeModal);
  const updateTaskStatus = useBoardStore((state) => state.updateTaskStatus);

  const handleStatusChange = (taskId, event) => {
    const newStatus = event.target.value;
    updateTaskStatus(taskId, newStatus);
  };

  return (
    <GenericModal>
      <span className="flex justify-between items-center">
        <h1 className="heading-large text-black ">{selectedTask?.title}</h1>
        <button
          className="kebab-menu text-[28px] w-[20px] text-right"
          // onClick={() => openGenericModal("deleteTask")}
          onClick={() => openGenericModal("taskOptions")}
        >
          ⋮
        </button>
      </span>
      {/* <div
        className="text-red mt-[10px] absolute l-0 text-[24px] font-bold right-5 top-3 cursor-pointer"
        onClick={closeModal}
      >
        X
      </div> */}
      {selectedTask?.description && (
        <p className="body-large text-mediumGray mt-[24px]">
          {selectedTask?.description}
        </p>
      )}
      <p className="body-medium text-mediumGray mt-[24px]">
        Subtasks (
        {selectedTask?.subtasks.filter((subtask) => subtask.isCompleted).length}{" "}
        {""}
        of {task.subtasks.length})
      </p>
      <div className="flex flex-col gap-[8px] mt-[16px]">
        {selectedTask?.subtasks.map((subtask, subTaskIndex) => (
          <div key={subTaskIndex} className="checkbox">
            <input
              type="checkbox"
              checked={subtask.isCompleted}
              onChange={(e) => {
                subtask.isCompleted = e.target.checked;
              }}
            />{" "}
            <p className={`${subtask.isCompleted ? "completed" : ""}`}>
              {" "}
              {subtask.title}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-[24px]">
        <p className="body-medium text-mediumGray">Current status</p>
        <select
          value={selectedTask?.status}
          onChange={(event) => handleStatusChange(selectedTask?.id, event)}
          className="mt-[8px]"
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </GenericModal>
  );
};

export default ViewTask;
