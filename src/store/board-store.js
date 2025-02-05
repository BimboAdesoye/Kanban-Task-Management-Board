import { create } from "zustand";
import kanbanData from "../kanbandata.json";

export const useBoardStore = create((set, get) => ({
  boards: (() => {
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
  })(),

  selectedBoardIndex: 0,
  setSelectedBoardIndex: (index) => set({ selectedBoardIndex: index }),

  addBoard: (newBoard) => {
    set((state) => {
      const updatedBoards = [...state.boards, newBoard];
      localStorage.setItem("boards", JSON.stringify(updatedBoards));
      return { boards: updatedBoards };
    });
  },

  editBoard: (boardId, updatedBoard) => {
    set((state) => {
      const updatedBoards = state.boards.map((board, boardIndex) =>
        boardIndex === boardId ? { ...board, ...updatedBoard } : board
      );
      localStorage.setItem("boards", JSON.stringify(updatedBoards));
      return { boards: updatedBoards };
    });
  },

  deleteBoard: (boardId) => {
    set((state) => {
      const updatedBoards = state.boards.filter(
        (_, index) => index !== boardId
      );
      localStorage.setItem("boards", JSON.stringify(updatedBoards));

      return { boards: updatedBoards };
    });
  },

  getTasks:
    (columnName = "Todo") =>
    (state) => {
      const selectedBoard = state.boards[state.selectedBoardIndex];
      if (!selectedBoard) return [];
      const column = selectedBoard.find((column) => column.name === columnName);
      return column ? column.tasks : [];
    },

  addTask: (boardId, newTask) => {
    set((state) => {
      const updatedBoards = state.boards.map((board, boardIndex) =>
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
      );

      localStorage.setItem("boards", JSON.stringify(updatedBoards));

      return { boards: updatedBoards };
    });
  },

  editTask: (boardId, taskId, updatedTask) => {
    set((state) => {
      const updatedBoards = state.boards.map((board, boardIndex) =>
        boardIndex === boardId
          ? {
              ...board,
              columns: board.columns.map((column) => ({
                ...column,
                tasks: column.tasks.map((task) =>
                  task.id === taskId ? { ...task, ...updatedTask } : task
                ),
              })),
            }
          : board
      );

      localStorage.setItem("boards", JSON.stringify(updatedBoards));

      return { boards: updatedBoards };
    });
  },

  updateTaskStatus: (taskId, newStatus) => {
    set((state) => {
      const updatedBoards = state.boards.map((board, boardIndex) =>
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
      );

      localStorage.setItem("boards", JSON.stringify(updatedBoards));

      return { board: updatedBoards };
    });
  },

  deleteTask: (boardId, taskId) => {
    set((state) => {
      const updatedBoards = [...state.boards];
      const selectedBoard = updatedBoards[boardId];

      selectedBoard.columns.forEach(
        (column) =>
          (column.tasks = column.tasks.filter((task) => task.id !== taskId))
      );

      localStorage.setItem("boards", JSON.stringify(updatedBoards));

      return { boards: updatedBoards };
    });
  },

  setColumn: (newColumns) => {
    (state) => {
      const updatedBoards = state.boards.map((board, boardIndex) =>
        boardIndex === state.selectedBoardIndex
          ? { ...board, columns: newColumns }
          : board
      );
      localStorage.setItem("boards", JSON.stringify(updatedBoards));
      return { boards: updatedBoards };
    };
  },

  onDragEnd: (result) => {
    const { source, destination, draggableId } = result;

    // If dropped outside or in the same position, do nothing
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const sourceColumn = get().getColumn(source.droppableId);
    const destinationColumn = get().getColumn(destination.droppableId);
    const task = sourceColumn.tasks.find((task) => task.id === draggableId);

    if (source.droppableId === destination.droppableId) {
      // Re-order within the same column
      const reOrderedTasks = get().reorderTasks(
        sourceColumn.tasks,
        source.index,
        destination.index
      );
      sourceColumn.tasks = reOrderedTasks;
    } else {
      // Move task to a different column
      sourceColumn.tasks = sourceColumn.tasks.filter(
        (task) => task.id !== draggableId
      );
      destinationColumn.tasks.splice(destination.index, 0, task);
    }

    const updatedColumns = get().getUpdatedColumns();
    get().setColumn(updatedColumns);

    localStorage.setItem("boards", JSON.stringify(get().boards));
  },

  // To reorder tasks within the same column
  reorderTasks: (tasks, startIndex, endIndex) => {
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  },

  // To get a column by name
  getColumn: (columnName) => {
    const selectedBoard = get().boards[get().selectedBoardIndex];
    return selectedBoard.columns.find((column) => column.name === columnName);
  },

  // To get the updated columns after drag and drop
  getUpdatedColumns: () => {
    const selectedBoard = get().boards[get().selectedBoardIndex];
    return selectedBoard.columns;
  },
}));
