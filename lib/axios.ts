// lib/axios.ts などにまとめると管理しやすい

import axios from "axios";

const api = axios.create({
  baseURL: "", // APIのベースURLを設定
  timeout: 10000, // タイムアウト時間を設定（ミリ秒単位）
  withCredentials: true, // クッキーを送信する場合はtrueに設定
});
