import axios from "axios";

const API_URL = "http://localhost:8080/api/rooms";

export const fetchRooms = async (userId: number) => {
  const token = localStorage.getItem("token"); // ローカルストレージからトークンを取得
  const response = await axios.get(`${API_URL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // トークンをヘッダーに追加
    },
  });
  return response.data; // タスクデータを返す
};

export const fetchRoomsForJoin = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const joinRoom = async (userId: number, roomId: number) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/join`,
    { userId, roomId }, // Send as JSON in the request body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
