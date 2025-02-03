import GenericModal from "./GenericModal";
import { useModalStore } from "../store/modal-store";
import { useBoardStore } from "../store/board-store";
import { useState } from "react";
import { toast } from "sonner";

const EditTask = () => {
  const selectedTask = useModalStore((state) => state.selectedTask);
  const selectedBoardIndex = useBoardStore((state) => state.selectedBoardIndex);
  const editTask = useBoardStore((state) => state.editTask);
  const closeGenericModal = useModalStore((state) => state.closeGenericModal);
  const [formData, setFormData] = useState(selectedTask);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubtaskChange = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      subtasks: prev.subtasks.map((subtask, subtaskIndex) =>
        subtaskIndex === index ? value : subtask
      ),
    }));
  };

  const handleAddSubtask = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      subtasks: [...prev.subtasks, ""],
    }));
  };

  const handleRemoveSubtask = (index) => {
    setFormData((prev) => ({
      ...prev,
      subtasks: prev.subtasks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    const updatedTask = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      subtasks: formData.subtasks.map((subtask) =>
        typeof subtask === "string"
          ? { title: subtask, isCompleted: false }
          : subtask
      ),
    };

    editTask(selectedBoardIndex, selectedTask.id, updatedTask);

    // Reset form and close modal
    setFormData({
      title: "",
      description: "",
      status: "Todo",
      subtasks: [],
    });

    closeGenericModal();

    toast.success("Task edited successfully!");
  };

  return (
    <GenericModal>
      <h1 className="heading-large text-black">Edit Task</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-[24px] flex flex-col gap-[24px]"
      >
        <div className="flex flex-col gap-[9px]">
          <label htmlFor="title" className="body-medium font-semibold">
            Title
          </label>
          <input
            type="text"
            className="body-large"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="description" className="body-medium">
            Description
          </label>
          <textarea
            className="body-large"
            name="description"
            type="text"
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="subtasks" className="body-medium">
            Subtasks
          </label>
          {formData.subtasks.map((subtask, subtaskIndex) => (
            <div key={subtaskIndex} className="flex gap-[16px] items-center">
              <input
                className="body-large font-semibold"
                type="text"
                placeholder={`Subtask ${subtaskIndex + 1}`}
                value={subtask.title}
                onChange={(e) =>
                  handleSubtaskChange(subtaskIndex, e.target.value)
                }
              />
              {formData.subtasks.length > 1 && (
                <span
                  className="cursor-pointer font-bold text-mediumGray text-[20px]"
                  onClick={() => handleRemoveSubtask(subtaskIndex)}
                >
                  X
                </span>
              )}
            </div>
          ))}
          <button
            className="btn btn-secondary p-[9px] text-[13px] font-bold mt-[12px]"
            onClick={handleAddSubtask}
          >
            + Add New Subtask
          </button>
          <div className="flex flex-col mt-[24px] gap-[8px]">
            <p className="body-medium text-mediumGray">Status</p>
            <div className="relative select-wrapper">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Todo">Todo</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>
          <button className="mt-[24px] btn btn-primary py-[9px] text-white text-[13px] font-bold">
            Save Changes
          </button>
        </div>
      </form>
    </GenericModal>
  );
};

export default EditTask;
