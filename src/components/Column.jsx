import { useBoardStore } from "../store/board-store.js";
import Task from "./Task.jsx";
import { Droppable } from "@hello-pangea/dnd";

const Column = () => {
  const boards = useBoardStore((state) => state.boards);
  const selectedBoardIndex = useBoardStore((state) => state.selectedBoardIndex);

  const selectedBoard = boards[selectedBoardIndex] || {};

  return (
    <div className="flex gap-[24px]">
      {selectedBoard.columns?.map((column, columnIndex) => (
        <Droppable key={columnIndex} droppableId={column.name}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="capitalize w-[280px] flex flex-col h-[fit-content]"
            >
              <span className="flex gap-[12px]">
                <div
                  className={`w-[15px] h-[15px] rounded-full mt-[2px]`}
                ></div>
                <p className="font-bold text-mediumGray text-[12px] mb-[19px] text-capitalize">
                  {column.name} ({column.tasks.length})
                </p>
              </span>
              <div className="flex flex-col gap-[20px]">
                {column.tasks.map((task, taskIndex) => {
                  return <Task key={task.id} task={task} index={taskIndex} />;
                })}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      ))}
    </div>
  );
};

export default Column;

// const columnColors = {
//   //   todo: "#49C4E5",
//   todo: "#000112",
//   doing: "#8471F2",
//   done: "#67E2AE",
// };

// const circleColor =
//   columnColors[column.name.toLowerCase()] || "#2B2C37";

// const circleColorClass = `bg-[${circleColor}]`;

// console.log(circleColor);
