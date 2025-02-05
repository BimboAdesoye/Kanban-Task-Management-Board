/* eslint-disable react/prop-types */
import { useModalStore } from "../store/modal-store";

const GenericModal = ({ children }) => {
  const isGenericModalOpen = useModalStore((state) => state.isGenericModalOpen);
  const closeGenericModal = useModalStore((state) => state.closeGenericModal);

  if (!isGenericModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center "
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="absolute inset-0 overlay"
        onClick={closeGenericModal}
      ></div>
      <div className="relative bg-white p-[32px] rounded-[5px] z-10 w-[90%] max-w-[480px] h-[fit-content] pointer-events-auto max-h-[90vh] overflow-y-auto scrollbar-none">
        {children}
      </div>
    </div>
  );
};

export default GenericModal;
