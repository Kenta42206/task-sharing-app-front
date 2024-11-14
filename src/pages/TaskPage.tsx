import React, { useEffect, useState } from "react";
import TaskCell from "../components/task/TaskCell";
import TaskEditForm from "../components/task/TaskEditForm";
import TaskForm from "../components/task/TaskForm";
import TaskHeader from "../components/task/TaskHeader";
import { Task } from "../types/Task";
import { useTaskContext } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import { lockTask, unlockTask } from "../services/LockService";

const TaskPage: React.FC = () => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLokedTaskOpen, setIsLokedTaskOpen] = useState<boolean>(false);
  const [creatingTask, setCreatingTask] = useState<boolean>(false);
  const [activeStatus, setActiveStatus] = useState<number | null>(null);

  const { currentUser } = useAuth();
  const {
    tasks,
    statuses,
    rooms,
    selectedRoomId,
    handleCreateTask,
    handleDeleteTask,
    handleRefreshTask,
    handleUpdateTask,
    handleSelectRoom,
  } = useTaskContext();

  const handleEditTask = async (id: number) => {
    const task = tasks.find((t) => t.id === id) || null;
    if (task && currentUser) {
      try {
        const response = await lockTask(task.id, currentUser.id);
        if (response.status === 200) {
          console.log("200");
          setIsLokedTaskOpen(false);
        } else {
          console.log("400");
          setIsLokedTaskOpen(true);
        }
      } catch (err) {
        setIsLokedTaskOpen(true);
        console.error("Failed to lock the task:", err);
      } finally {
        setEditingTask(task);
      }
    }
  };

  const handleEditCancel = async (id: number) => {
    try {
      await unlockTask(id);
      setEditingTask(null);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLokedTaskOpen(false);
    }
  };

  const filterTasksByStatus = (statusId: number | null) => {
    return statusId
      ? tasks.filter((task) => task.status.id === statusId)
      : tasks; // statusIdがnullのときは全タスクを返す
  };

  const handleTabClick = (statusId: number | null) => {
    setActiveStatus(statusId);
  };

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roomId = Number(e.target.value);
    console.log(roomId);
    handleSelectRoom(roomId);
  };

  return (
    <div className="flex flex-col h-screen">
      <TaskHeader
        onCreateTask={() => setCreatingTask(true)}
        onRefresh={handleRefreshTask}
      />
      {creatingTask ? (
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setCreatingTask(false)}
        />
      ) : null}

      {editingTask ? (
        <TaskEditForm
          task={editingTask}
          isLokedTaskOpen={isLokedTaskOpen}
          onSubmit={handleUpdateTask}
          onCancel={handleEditCancel}
        />
      ) : null}

      <select
        value={selectedRoomId ?? ""}
        onChange={handleRoomChange}
        required
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      >
        {rooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.name}
          </option>
        ))}
      </select>

      {/* タブの作成 */}
      <div className="flex space-x-4 mt-4 overflow-x-auto">
        {statuses.map((status) => (
          <button
            key={status.id}
            onClick={() => handleTabClick(status.id)}
            className={`py-2 px-4 rounded ${
              activeStatus === status.id ? "bg-blue-500" : "bg-gray-200"
            }`}
          >
            {status.name}
          </button>
        ))}
        <button
          onClick={() => handleTabClick(null)} // 全タスクを表示するためのボタン
          className={`py-2 px-4 rounded ${
            activeStatus === null ? "bg-blue-500" : "bg-gray-200"
          }`}
        >
          全て
        </button>
      </div>

      {/* タスク表示部分 */}
      <div className="flex-1 overflow-y-auto mt-4">
        {tasks.length === 0 ? (
          <p>タスクがありません。</p>
        ) : (
          <div>
            {filterTasksByStatus(activeStatus).map((task) => (
              <TaskCell
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskPage;
