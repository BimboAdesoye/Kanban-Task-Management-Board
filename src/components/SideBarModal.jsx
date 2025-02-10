/* eslint-disable react/prop-types */
import { useModalStore } from "../store/modal-store";

const SideBarModal = ({ children }) => {
  const isSideBarModalOpen = useModalStore((state) => state.isSideBarModalOpen);
  const closeSideBarModal = useModalStore((state) => state.closeSideBarModal);

  if (!isSideBarModalOpen) return null;

  return (
    <div
      className="fixed top-[64px] right-0 bottom-0 left-0 z-50 flex justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="absolute inset-0 overlay"
        onClick={closeSideBarModal}
      ></div>
      <div className="relative bg-white py-[16px] rounded-[5px] z-10 w-[90%] max-w-[264px] h-[fit-content] pointer-events-auto max-h-[90vh] overflow-y-auto scrollbar-none mt-[16px]">
        {children}
      </div>
    </div>
  );
};

export default SideBarModal;
