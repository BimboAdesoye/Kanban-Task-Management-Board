import { create } from "zustand";
import kanbanData from "../kanbandata.json";

export const useBoardStore = create((set) => ({
  boards: kanbanData.boards,
  selectedBoardIndex: 0,
  setSelectedBoardIndex: (index) => set({ selectedBoardIndex: index }), 
  addTask: (boardId, newTask) =>
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.name === "Todo"
                  ? {
                      ...column,
                      tasks: [...column.tasks, newTask],
                    }
                  : column
              ),
            }
          : board
      ),
    })),
}));

