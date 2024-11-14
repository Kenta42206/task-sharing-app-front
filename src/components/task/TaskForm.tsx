import React, { useState } from "react";
import { TaskCreate } from "../../types/Task";
import { useTaskContext } from "../../context/TaskContext";

interface TaskFormProps {
  onSubmit: (task: TaskCreate) => Promise<void>;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [progress, setProgress] = useState<number>(0);
  const [importance, setImportance] = useState<number>(1);
  const [categoryId, setCategoryId] = useState<number>(1);
  const [statusId, setStatusId] = useState<number>(1);

  const { categories, statuses, rooms, selectedRoomId } = useTaskContext();

  const handleCreateTask = async () => {
    try {
      await onSubmit({
        title,
        description,
        dueDate,
        progress,
        importance,
        category: categories[categoryId - 1], //selectのvalueが1から始まるため-1する
        status: statuses[statusId - 1],
        room: rooms[selectedRoomId - 1],
      });
      onCancel();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-4">タスク作成</h2>
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="説明"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="progress"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          min={0}
          max={100}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Importance"
          value={importance}
          onChange={(e) => setImportance(Number(e.target.value))}
          min={1}
          max={5}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <select
          value={categoryId ?? ""}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          required
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          value={statusId ?? ""}
          onChange={(e) => setStatusId(Number(e.target.value))}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          {statuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="mr-4 p-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={handleCreateTask}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            作成
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
