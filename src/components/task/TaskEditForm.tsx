import React, { useEffect, useState } from "react";
import { TaskEdit } from "../../types/Task";
import { useTaskContext } from "../../context/TaskContext";
import { checkLockStatus } from "../../services/LockService";

interface TaskEditFormProps {
  task: TaskEdit;
  isLokedTaskOpen: boolean;
  onSubmit: (task: TaskEdit) => void;
  onCancel: (id: number) => void;
}

const TaskEditForm: React.FC<TaskEditFormProps> = ({
  task,
  isLokedTaskOpen,
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [progress, setProgress] = useState(task.progress);
  const [importance, setImportance] = useState(task.importance);
  const [categoryId, setCategoryId] = useState<number>(1); // カテゴリIDの状態を追加
  const [statusId, setStatusId] = useState<number>(1);

  const { categories, statuses } = useTaskContext();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      id: task.id,
      title: title,
      description: description,
      dueDate: dueDate,
      progress: progress || 0,
      importance: importance || 3,
      category: categories[categoryId - 1] || categories[0],
      status: statuses[statusId - 1] || statuses[0],
    });
    onCancel(task.id);
  };

  console.log(isLokedTaskOpen);

  const handleCancel = () => {
    onCancel(task.id);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-4 font-bold">タスク編集</h2>
        <form onSubmit={handleSubmit}>
          <label className="text-sm ml-1 font-bold">タイトル</label>
          <input
            type="text"
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isLokedTaskOpen}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <label className="text-sm ml-1 font-bold">説明</label>
          <textarea
            placeholder="説明"
            value={description}
            disabled={isLokedTaskOpen}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <label className="text-sm ml-1 font-bold">期限</label>
          <input
            type="date"
            value={dueDate}
            disabled={isLokedTaskOpen}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <label className="text-sm ml-1 font-bold">進捗</label>
          <input
            type="number"
            placeholder="progress"
            value={progress}
            disabled={isLokedTaskOpen}
            onChange={(e) => setProgress(Number(e.target.value))}
            min={0}
            max={100}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <label className="text-sm ml-1 font-bold">重要度</label>
          <input
            type="number"
            placeholder="Importance"
            value={importance}
            disabled={isLokedTaskOpen}
            onChange={(e) => setImportance(Number(e.target.value))}
            min={1}
            max={5}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <label className="text-sm ml-1 font-bold">カテゴリ</label>
          <select
            value={categoryId ?? ""}
            disabled={isLokedTaskOpen}
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
          <label className="text-sm ml-1 font-bold">ステータス</label>
          <select
            value={statusId ?? ""}
            disabled={isLokedTaskOpen}
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
              onClick={handleCancel}
              className="mr-4 p-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={isLokedTaskOpen}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              更新
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskEditForm;
