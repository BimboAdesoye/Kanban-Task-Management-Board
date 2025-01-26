import { create } from "zustand";

export const useModalStore = create((set) => ({
  isModalOpen: false,
  selectedTask: null,
  openModal: (task) => set({ isModalOpen: true, selectedTask: { ...task } }),
  closeModal: () => set({ isModalOpen: false }),

  isAddTaskModalOpen: false,
  openAddTaskModal: () => set({ isAddTaskModalOpen: true }),
  closeAddTaskModal: () => set({ isAddTaskModalOpen: false }),
}));
