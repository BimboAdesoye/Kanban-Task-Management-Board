import GenericModal from "./GenericModal";
import { useModalStore } from "../store/modal-store";

const TaskOptions = () => {
  const openGenericModal = useModalStore((state) => state.openGenericModal);


  return (
    <GenericModal>
      <div className="flex gap-[16px]">
        <button
          className="btn btn-secondary py-[9px] text-purple w-[50%] font-bold"
          onClick={() => openGenericModal("editTask")}
        >
          Edit Task
        </button>
        <button
          className="btn btn-destructive py-[9px] text-white w-[50%] font-bold"
          onClick={() => openGenericModal("deleteTask")}
        >
          Delete Task
        </button>
      </div>
    </GenericModal>
  );
};

export default TaskOptions;
