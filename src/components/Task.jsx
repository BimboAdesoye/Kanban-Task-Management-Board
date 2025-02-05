/* eslint-disable react/prop-types */
import { useModalStore } from "../store/modal-store.js";
import DeleteTask from "./DeleteTask.jsx";
import ViewTask from "./ViewTask.jsx";
import TaskOptions from "./TaskOptions.jsx";
import EditTask from "./EditTask.jsx";
import { Draggable } from "@hello-pangea/dnd";

const Task = ({ task, index }) => {
  const currentModal = useModalStore((state) => state.currentModal);
  const openGenericModal = useModalStore((state) => state.openGenericModal);

  // const id = task.id;
  // const taskIndex = parseInt(id.split("-")[1], 10);
  // console.log(taskIndex);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => openGenericModal("viewTask", task)}
          className="py-[23px] px-[16px] bg-white w-full rounded-[5px] shadow-subtle cursor-pointer"
        >
          <p className="heading-medium text-black">{task.title}</p>
          <p className="body-medium text-mediumGray mt-[8px]">
            {task.subtasks.filter((subtask) => subtask.isCompleted).length} {""}
            of {task.subtasks.length} subtasks
          </p>
          {currentModal === "viewTask" && <ViewTask task={task} />}
          {currentModal === "taskOptions" && <TaskOptions />}
          {currentModal === "editTask" && <EditTask />}
          {currentModal === "deleteTask" && <DeleteTask />}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
