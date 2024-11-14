import axios from "axios";

const API_URL = "http://localhost:8080/api/statuses";

export const fetchStatuses = async () => {
  const token = localStorage.getItem("token"); // ローカルストレージからトークンを取得
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`, // トークンをヘッダーに追加
    },
  });
  return response.data; // タスクデータを返す
};
