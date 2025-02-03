/* eslint-disable react/prop-types */
import { useModalStore } from "../store/modal-store.js";
import DeleteTask from "./DeleteTask.jsx";
import ViewTask from "./ViewTask.jsx";
import TaskOptions from "./TaskOptions.jsx";
import EditTask from "./EditTask.jsx";
// import { motion, AnimatePresence } from "framer-motion";

const Task = ({ task }) => {
  // const openModal = useModalStore((state) => state.openModal);
  const currentModal = useModalStore((state) => state.currentModal);
  const openGenericModal = useModalStore((state) => state.openGenericModal);

  // const modalVariants = {
  //   hidden: { opacity: 0, scale: 0.9 },
  //   visible: { opacity: 1, scale: 1 },
  //   exit: { opacity: 0, scale: 0.9 },
  // };

  return (
    <div
      onClick={() => openGenericModal("viewTask", task)}
      className="py-[23px] px-[16px] bg-white w-full rounded-[5px] shadow-subtle cursor-pointer"
    >
      <p className="heading-medium text-black">{task.title}</p>
      <p className="body-medium text-mediumGray mt-[8px]">
        {task.subtasks.filter((subtask) => subtask.isCompleted).length} {""}
        of {task.subtasks.length} subtasks
      </p>
      {currentModal === "viewTask" && <ViewTask task={task} />}
      {currentModal === "deleteTask" && <DeleteTask />}
      {currentModal === "taskOptions" && <TaskOptions/>}
      {currentModal === "editTask" && <EditTask />}
            {/* <AnimatePresence>
        {currentModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default Task;
