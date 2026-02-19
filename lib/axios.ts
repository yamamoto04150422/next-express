import qs from "qs";
import { showToast } from "@/app/utils/uiService/toastService";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: "", // APIのベースURLを設定
  timeout: 10000, // タイムアウト時間を設定（ミリ秒単位）
  withCredentials: true, // クッキーを送信する場合はtrueに設定
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

// Orval用のmutator関数
export const apiClient = async <T = unknown, D = unknown>(
  config: AxiosRequestConfig<D>
): Promise<AxiosResponse<T>> => {
  return api.request<T, AxiosResponse<T>, D>(config);
};

api.interceptors.request.use(
  (config) => {
    console.log(
      `[APIリクエスト] ${config.method?.toUpperCase()} ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("[リクエストエラー]", error);
    return Promise.reject(error);
  }
);

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
      showToast("warn", "認証が必要です。再度ログインしてください。");
      if (typeof window !== "undefined") {
        // ログアウト処理やリダイレクトを必要に応じてここに書く
        // localStorage.removeItem("token");
        // window.location.href = "/login";
      }
      return Promise.reject(error);
    } else if (status === 403) {
      // 権限エラー
      console.warn("アクセスが拒否されました。");
      showToast("error", "アクセスが拒否されました。");
      return Promise.reject(error);
    }
    // 400番台のその他のエラー
    if (status >= 400 && status < 500) {
      // それ以外のクライアントエラー（例：バリデーションなど）
      console.warn("入力内容を確認してください。");
      showToast("error", "入力内容を確認してください。");
      return Promise.reject(error);
    }
    // 500番台のエラー
    if (status >= 500) {
      // サーバーエラー
      console.warn("サーバーでエラーが発生しました。");
      showToast("error", "サーバーでエラーが発生しました。");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
