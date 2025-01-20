import Board from "./Board";

const SideBar = () => {
  return (
    <div className="w-[240px] h-full bg-white border-r-[1px] border-linesLight">
      <p className="text-center font-bold text-mediumGray text-[12px] mb-[19px]">
        ALL BOARDS (3)
      </p>
      <Board />
    </div>
  );
};

export default SideBar;
