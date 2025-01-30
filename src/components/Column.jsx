import { useBoardStore } from "../store/board-store.js";
import Task from "./Task.jsx";

const Column = () => {
  const boards = useBoardStore((state) => state.boards);
  const selectedBoardIndex = useBoardStore((state) => state.selectedBoardIndex);

  const selectedBoard = boards[selectedBoardIndex] || {};

  return (
    <div className="flex gap-[24px]">
      {selectedBoard.columns?.map((column, columnIndex) => {
        console.log(column.name)
      
        return (
          <div
            className="capitalize w-[280px] flex flex-col h-[fit-content]"
            key={columnIndex}
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
                return <Task key={taskIndex} task={task} />;
              })}
            </div>
          </div>
        );
      })}
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