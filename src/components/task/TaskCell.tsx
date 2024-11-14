import React from "react";
import { Task } from "../../types/Task";
import { FaEdit, FaTrash } from "react-icons/fa";

interface TaskCellProps {
  task: Task;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskCell: React.FC<TaskCellProps> = ({ task, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("ja-JP", {
      year: "numeric", // または "2-digit"
      month: "2-digit", // "numeric" や "long" も可能
      day: "2-digit", // "numeric" や "long" も可能
      hour: "2-digit", // "numeric" を使用
      minute: "2-digit", // "numeric" を使用
    });
    return formattedDate;
  };
  return (
    <div className="relative border border-gray-300 p-4 mb-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-600">
          Created By {task.user.username}
        </span>
        <span
          className={`absolute top-4 right-4 text-sm font-semibold ${
            task.importance === 1
              ? "text-green-500"
              : task.importance === 2
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          重要度: {task.importance}
        </span>
      </div>

      <p className="text-gray-500 mt-2">期限: {task.dueDate}</p>

      {/* 進捗バーの表示 */}
      <div className="mt-2">
        <p className="text-gray-500">進捗: {task.progress}%</p>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center">
            <div className="w-full bg-gray-300 rounded">
              <div
                className={`h-2 rounded ${
                  task.progress < 50
                    ? "bg-red-500"
                    : task.progress < 100
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task.id)}
            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition duration-150"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-150"
          >
            <FaTrash />
          </button>
        </div>
        <span className="text-xs text-gray-500">
          作成日: {formatDate(task.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default TaskCell;
