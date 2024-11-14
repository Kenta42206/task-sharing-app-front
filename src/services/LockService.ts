import axios from "axios";

const API_URL = "http://localhost:8080/api/locks";

export const checkLockStatus = async (taskId: number, userId: number) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/status/${taskId}`, {
    params: { userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const lockTask = async (taskId: number, userId: number) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/lock/${taskId}`, null, {
    params: { userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("responce :");
  console.log(response);
  return response;
};

export const unlockTask = async (taskId: number) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/unlock/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
