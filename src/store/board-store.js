import { create } from "zustand";
import kanbanData from "../kanbandata.json";

export const useBoardStore = create((set, get) => ({
  // boards: kanbanData.boards.map((board) => ({
  //   ...board,
  //   columns: board.columns.map((column) => ({
  //     ...column,
  //     tasks: column.tasks.map((task, index) => ({
  //       ...task,
  //       id: `${column.name}-${index}`,
  //     })),
  //   })),
  // })),

  boards: () => {
    const storedBoards = JSON.parse(localStorage.getItem("boards"));
    return storedBoards
      ? storedBoards
      : kanbanData.boards.map((board) => ({
          ...board,
          columns: board.columns.map((column) => ({
            ...column,
            tasks: column.tasks.map((task, index) => ({
              ...task,
              id: `${column.name}-${index}`,
            })),
          })),
        }));
  },

  selectedBoardIndex: 0,
  setSelectedBoardIndex: (index) => set({ selectedBoardIndex: index }),

  getTasks:
    (columnName = "Todo") =>
    (state) => {
      const selectedBoard = state.boards[state.selectedBoardIndex];
      if (!selectedBoard) return [];
      const column = selectedBoard.find((column) => column.name === columnName);
      return column ? column.tasks : [];
    },

  addTask: (boardId, newTask) =>
    set((state) => ({
      boards: state.boards.map((board, boardIndex) =>
        boardIndex === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.name === "Todo"
                  ? {
                      ...column,
                      tasks: [
                        ...column.tasks,
                        {
                          id: `${column.name}-${Date.now()}`,
                          title: newTask.title,
                          description: newTask.description,
                          status: newTask.status || "Todo",
                          subtasks: newTask.subtasks || [],
                        },
                      ],
                    }
                  : column
              ),
            }
          : board
      ),
    })),

  updateTaskStatus: (taskId, newStatus) =>
    set((state) => ({
      boards: state.boards.map((board, boardIndex) =>
        boardIndex === state.selectedBoardIndex
          ? {
              ...board,
              columns: board.columns.map((column) => ({
                ...column,
                tasks: column.tasks.map((task) =>
                  task.id === taskId ? { ...task, status: newStatus } : task
                ),
              })),
            }
          : board
      ),
    })),
}));
