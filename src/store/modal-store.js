import { create } from "zustand";

export const useModalStore = create((set) => ({
  isModalOpen: false,
  selectedTask: null,

  currentModal: null,
  openCurrentModal: (modal) => set({ currentModal: modal }),
  closeCurrentModal: () =>
    set({ currentModal: null, isModalOpen: false, selectedTask: null }),

  // openModal: (task, modalName) =>
  //   set({
  //     isModalOpen: true,
  //     selectedTask: { ...task },
  //     currentModal: modalName,
  //   }),

  // closeModal: () => set({ isModalOpen: false }),

  isAddTaskModalOpen: false,
  openAddTaskModal: () => set({ isAddTaskModalOpen: true }),
  closeAddTaskModal: () => set({ isAddTaskModalOpen: false }),

  isGenericModalOpen: false,

  openGenericModal: (modalName, task) =>
    set((state) => ({
      isGenericModalOpen: true,
      currentModal: modalName,
      selectedTask: task !== undefined ? { ...task } : state.selectedTask,
    })),

  closeGenericModal: () =>
    set({ isGenericModalOpen: false, currentModal: null, selectedTask: null }),
}));
