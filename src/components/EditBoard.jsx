import GenericModal from "./GenericModal.jsx";
import { useBoardStore } from "../store/board-store.js";
import { useModalStore } from "../store/modal-store.js";
import { useState } from "react";
import { toast } from "sonner";

const EditBoard = () => {
  const boards = useBoardStore((state) => state.boards);
  const selectedBoardIndex = useBoardStore((state) => state.selectedBoardIndex);
  const closeGenericModal = useModalStore((state) => state.closeGenericModal);
  const editBoard = useBoardStore((state) => state.editBoard);

  const selectedBoard = boards[selectedBoardIndex] || {};

  const [formData, setFormData] = useState(selectedBoard);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleColumnChange = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      columns: prev.columns.map((column, columnIndex) =>
        columnIndex === index ? value : column
      ),
    }));
  };

  const handleAddColumn = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      columns: [...prev.columns, ""],
    }));
  };

  const handleRemoveColumn = (index) => {
    setFormData((prev) => ({
      ...prev,
      columns: prev.columns.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const updatedBoard = {
      name: formData.name,
      columns: formData.columns.map((column) =>
        typeof column === "string" ? { name: column, tasks: [] } : column
      ),
    };

    editBoard(selectedBoardIndex, updatedBoard);
    setFormData({ name: "", columns: [] });

    closeGenericModal();

    toast.success("Board edited successfully.");
  };
  return (
    <GenericModal>
      <h1 className="heading-large text-black">Edit Board</h1>
      <form
        className="mt-[24px] flex flex-col gap-[24px]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="name" className="body-medium">
            Board Name
          </label>
          <input
            className="body-large font-semibold"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="columns" className="body-medium">
            Columns
          </label>
          {formData.columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex gap-[16px] items-center">
              <input
                className="body-large"
                type="text"
                value={column.name}
                onChange={(e) =>
                  handleColumnChange(columnIndex, e.target.value)
                }
              />
              {formData.columns.length > 1 && (
                <span
                  className="cursor-pointer font-bold text-mediumGray text-[20px]"
                  onClick={() => handleRemoveColumn(columnIndex)}
                >
                  X
                </span>
              )}
            </div>
          ))}
        </div>
        <button
          className="btn btn-secondary p-[9px] text-[13px] font-bold mt-[12px] outline-none"
          onClick={handleAddColumn}
        >
          + Add New Column
        </button>
        <button className="btn btn-primary py-[9px] text-white text-[13px] font-bold">
          Save Changes
        </button>
      </form>
    </GenericModal>
  );
};

export default EditBoard;
