import axios from "axios";

export const api = axios.create({
  baseURL: "", // APIのベースURLを設定
  timeout: 10000, // タイムアウト時間を設定（ミリ秒単位）
  withCredentials: true, // クッキーを送信する場合はtrueに設定
});

api.interceptors.response.use(
  (response) => {
    console.log(
      `[APIレスポンス] ✅ ${response.status} ${response.config.url}`,
      response.data
    );
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    if (status === 401) {
      console.warn(`[APIレスポンス] 🔒 401 Unauthorized: ${url}`);
      if (typeof window !== "undefined") {
        // ログアウト処理やリダイレクトを必要に応じてここに書く
        // localStorage.removeItem("token");
        // window.location.href = "/login";
      }
    } else {
      console.error(
        `[APIレスポンス] ${status} Error: ${url}`,
        error.response?.data
      );
    }

    return Promise.reject(error);
  }
);
