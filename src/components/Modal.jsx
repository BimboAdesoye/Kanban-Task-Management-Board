/* eslint-disable react/prop-types */
import { useModalStore } from "../store/modal-store.js";

const Modal = ({ children }) => {
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  const selectedTask = useModalStore((state) => state.selectedTask);

  if (!isModalOpen || !selectedTask) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute inset-0 overlay" onClick={closeModal}></div>
      <div className="relative bg-white p-[32px] rounded-[5px] z-10 w-[480px] h-[fit-content] pointer-events-auto">
        {children}
      </div>
    </div>
  );
};

export default Modal;
