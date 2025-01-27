import GenericModal from "./GenericModal.jsx";
import { useBoardStore } from "../store/board-store.js";
import { useModalStore } from "../store/modal-store.js";
import { useState } from "react";
import { toast } from "sonner";

const AddBoard = () => {
  const addBoard = useBoardStore((state) => state.addBoard);
  const closeGenericModal = useModalStore((state) => state.closeGenericModal);

  const [formData, setFormData] = useState({
    name: "",
    columns: [],
  });

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

    const newBoard = {
      name: formData.name,
      columns: formData.columns.map((column) => ({
        name: column,
        tasks: [],
      })),
    };

    addBoard(newBoard);
    setFormData({ name: "", columns: [] });

    closeGenericModal();

    toast.success("Board added successfully.");
  };

  return (
    <GenericModal>
      <h1 className="heading-large text-black">Add New Board</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-[24px] flex flex-col gap-[24px]"
      >
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="name" className="body-medium">
            Name
          </label>
          <input
            type="text"
            placeholder="e.g. Web Design"
            className="body-large"
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
                placeholder="e.g. Todo"
                value={column}
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
          className="btn btn-secondary p-[9px] text-[13px] font-bold mt-[12px]"
          onClick={handleAddColumn}
        >
          + Add New Column
        </button>
        <button className="btn btn-primary py-[9px] text-white text-[13px] font-bold">
          Create New Board
        </button>
      </form>
    </GenericModal>
  );
};

export default AddBoard;
