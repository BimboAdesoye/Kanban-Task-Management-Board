import AddTaskModal from "./AddTaskModal.jsx";
import { useBoardStore } from "../store/board-store.js";
import { useModalStore } from "../store/modal-store.js";
import { useState } from "react";
import { toast } from "sonner";

const AddTask = () => {
  const selectedBoardIndex = useBoardStore((state) => state.selectedBoardIndex);
  const closeAddTaskModal = useModalStore((state) => state.closeAddTaskModal);
  const addTask = useBoardStore((state) => state.addTask);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Todo",
    subtasks: [],
  });



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
    if (!formData.title.trim()) return;

    const newTask = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      subtasks: formData.subtasks
        .filter((subtask) => subtask.trim() !== "")
        .map((subtask) => ({ title: subtask, isCompleted: false })),
    };

    addTask(selectedBoardIndex, newTask);

    // Reset form and close modal
    setFormData({
      title: "",
      description: "",
      status: "Todo",
      subtasks: [],
    });

    closeAddTaskModal();

    toast.success("Task added successfully!");
  };

  return (
    <AddTaskModal>
      <h1 className="heading-large text-black">Add New Task</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-[24px] flex flex-col gap-[24px]"
      >
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="title" className="body-medium">
            Title
          </label>
          <input
            className="body-large"
            name="title"
            type="text"
            placeholder="e.g. Take coffee break"
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
                className="body-large"
                type="text"
                placeholder={`Subtask ${subtaskIndex + 1}`}
                value={subtask}
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
          <button
           className="mt-[24px] btn btn-primary py-[9px] text-white text-[13px] font-bold">
            Create Task
          </button>
        </div>
      </form>
    </AddTaskModal>
  );
};

export default AddTask;
