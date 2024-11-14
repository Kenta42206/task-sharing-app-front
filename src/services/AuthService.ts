import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/"; // 認証APIのエンドポイント

export const login = async (username: string, password: string) => {
  const loginApiUrl = API_URL + "login";
  const response = await axios.post(loginApiUrl, { username, password });
  return response.data; // トークンやユーザー情報などを返す
};

export const signup = async (
  username: string,
  password: string,
  email: string
) => {
  const signupApiUrl = API_URL + "signup";
  try {
    const response = await axios.post(signupApiUrl, {
      username,
      password,
      email,
    });
    return response.data;
  } catch (err) {
    throw new Error("サインアップ失敗しました");
  }
};
