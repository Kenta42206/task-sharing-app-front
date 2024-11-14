import axios from "axios";
import { TaskCreate, TaskEdit } from "../types/Task";

const API_URL = "http://localhost:8080/api/tasks";

export const fetchTasks = async (roomId: number, userId: number) => {
  const token = localStorage.getItem("token"); // ローカルストレージからトークンを取得
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`, // トークンをヘッダーに追加
    },
    params: {
      roomId: roomId, // ここに実際の roomId を指定
      userId: userId, // ここに実際の userId を指定
    },
  });
  return response.data; // タスクデータを返す
};

export const createTask = async (task: TaskCreate) => {
  const token = localStorage.getItem("token");
  await axios.post(API_URL, task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTask = async (task: TaskEdit) => {
  const token = localStorage.getItem("token");

  await axios.put(`${API_URL}/${task.id}`, task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteTask = async (id: number) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
