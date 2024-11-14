import { createContext, useContext, useEffect, useState } from "react";
import { Task, TaskCreate, TaskEdit } from "../types/Task";
import { Category } from "../types/Category";
import { Status } from "../types/Status";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../services/TaskService";
import { fetchCategories } from "../services/CategoryService";
import { fetchStatuses } from "../services/StatusService";
import { useAuth } from "./AuthContext";
import ErrorModal from "../components/ErrorModal";
import { checkLockStatus } from "../services/LockService";
import { Room } from "../types/Room";
import {
  fetchRooms,
  fetchRoomsForJoin,
  joinRoom,
} from "../services/RoomService";

interface TaskContextType {
  tasks: Task[];
  error: string | null;
  categories: { id: number; name: string }[];
  statuses: { id: number; name: string }[];
  rooms: { id: number; name: string }[];
  selectedRoomId: number;
  roomsForJoin: Room[];
  loadTasks: () => Promise<void>;
  handleCreateTask: (task: TaskCreate) => Promise<void>;
  handleUpdateTask: (task: TaskEdit) => Promise<void>;
  handleDeleteTask: (id: number) => Promise<void>;
  handleRefreshTask: () => void;
  handleSelectRoom: (id: number) => void;
  handleRefreshRoom: () => void;
  handleJoinRoom: (id: number) => Promise<void>;
  setNewError: (err: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<number>(1);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [roomsForJoin, setRoomsForJoin] = useState<Room[]>([]);

  const { isAuthenticated, currentUser } = useAuth();

  const loadTasks = async () => {
    try {
      if (currentUser) {
        const taskData = await fetchTasks(selectedRoomId, currentUser.id);
        setTasks(taskData);
      }
    } catch (err) {
      if (rooms.length === 0) {
        console.log("load tasks");
        setError("roomに参加してください。");
      } else {
        setError("タスクの取得に失敗しました。");
      }
    }
  };

  const loadCategories = async () => {
    try {
      const categoryData = await fetchCategories();
      setCategories(categoryData);
    } catch (err) {
      setError("カテゴリの取得に失敗しました。");
    }
  };

  const loadStatuses = async () => {
    try {
      const statusData = await fetchStatuses();
      setStatuses(statusData);
    } catch (err) {
      setError("ステータスの取得に失敗しました。");
    }
  };

  const loadRooms = async () => {
    try {
      if (currentUser) {
        const roomData = await fetchRooms(currentUser.id);
        setRooms(roomData);
      }
    } catch (err) {
      setError("roomの取得に失敗しました。");
    }
  };

  const loadRoomsinRoomMasterScreen = async () => {
    try {
      const roomList: Room[] = await fetchRoomsForJoin();
      await filterRooms(roomList);
    } catch (err) {
      setError("roomの取得に失敗しました。");
    }
  };

  const filterRooms = async (roomList: Room[]) => {
    const joinedRoomIds = new Set(rooms.map((room) => room.id));
    const nonJoinedRooms = roomList.filter(
      (room) => !joinedRoomIds.has(room.id)
    );
    console.log(nonJoinedRooms);
    setRoomsForJoin(nonJoinedRooms);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadRooms();
      loadCategories();
      loadStatuses();
      loadRoomsinRoomMasterScreen();
      if (rooms.length !== 0) {
        loadTasks();
      }
    }
  }, [isAuthenticated]);

  const handleCreateTask = async (task: TaskCreate) => {
    try {
      await createTask(task);
      loadTasks();
    } catch (err) {
      setError("Taskの作成に失敗しました。");
      console.error(err);
    }
  };

  const handleUpdateTask = async (task: TaskEdit) => {
    try {
      await updateTask(task);
      loadTasks();
    } catch (err) {
      setError("Taskの更新に失敗しました。");
      console.error(err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      if (currentUser) {
        const isLocked = await checkLockStatus(id, currentUser.id);
        if (!isLocked) {
          await deleteTask(id);
          loadTasks();
        } else {
          setError(
            `taskid: ${id} は他のユーザにロックされているため削除できません`
          );
        }
      }
    } catch (err) {
      setError("タスクの削除に失敗しました。");
    }
  };

  const handleRefreshTask = async () => {
    loadRooms();
    setError(null);
    if (rooms.length !== 0) {
      loadTasks();
    } else {
      console.log("handleRefreshTask");
      setError("roomに参加してください。");
    }
  };

  const handleRefreshRoom = async () => {
    await loadRooms();
    await filterRooms(roomsForJoin);
    setError(null);
  };

  const handleSelectRoom = (id: number) => {
    console.log(id); //id 1
    console.log(selectedRoomId); //id 1
    setSelectedRoomId(id);
  };

  const handleJoinRoom = async (id: number) => {
    try {
      if (currentUser) {
        await joinRoom(currentUser.id, id);
      }
    } catch (err) {
      setError("roomへの参加に失敗しました。");
    } finally {
      await filterRooms(roomsForJoin);
      await loadRooms();
    }
  };

  useEffect(() => {
    // selectedRoomIdが変更された後に実行される
    loadTasks();
  }, [selectedRoomId]);

  const resetError = async () => {
    setError(null);
  };

  const setNewError = async (err: string) => {
    setError(err);
  };

  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
    } else {
      setShowErrorModal(false);
    }
  }, [error]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        error,
        categories,
        statuses,
        rooms,
        selectedRoomId,
        roomsForJoin,
        loadTasks,
        handleCreateTask,
        handleUpdateTask,
        handleDeleteTask,
        handleRefreshTask,
        handleSelectRoom,
        handleRefreshRoom,
        handleJoinRoom,
        setNewError,
      }}
    >
      {children}
      {showErrorModal && error && (
        <ErrorModal errorMessage={error} onClose={resetError} />
      )}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
