# 1. 要件の全体像

| 内容                 | 詳細                                                              |
| -------------------- | ----------------------------------------------------------------- |
| 認証方式             | JWTをサーバー側で発行し、**HttpOnly Cookie**でブラウザに保存      |
| 認証状態の保持       | Cookieに保存されたJWTをブラウザが自動送信（withCredentials）      |
| 認証トークン送信方法 | **Cookieの自動送信**で明示的なAuthorizationヘッダー付与は不要     |
| エラー処理           | バックエンドがJWTの有効性を検証し、無効なら401を返す              |
| フロントでの対応     | AxiosのwithCredentialsを有効化し、401はインターセプターで共通処理 |

# 2. フロント側でやること（React＋Axios）

| 項目                          | 内容・例                                                                                                                                                                          |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Axiosのインスタンス設定       | `withCredentials: true` を `axios.create` で設定                                                                                                                                  |
| 例: `axios.ts`                | `ts<br>import axios from 'axios';<br>const apiClient = axios.create({<br> baseURL: 'https://api.example.com',<br> withCredentials: true,<br>});<br>export default apiClient;<br>` |
| API呼び出し                   | すべてこの `apiClient` を使うことでCookie自動送信                                                                                                                                 |
| 401エラーの共通処理           | Axiosのレスポンスインターセプターで 401を検知し、ログイン画面へリダイレクト等                                                                                                     |
| JWTトークンの明示的保存・管理 | **不要**（HttpOnly Cookieでブラウザが管理するため）                                                                                                                               |

# 3. バックエンド側でやること（Java Springなど）

| 項目         | 内容・例                                                                                                       |
| ------------ | -------------------------------------------------------------------------------------------------------------- |
| JWTの発行    | ログイン成功時にJWTを生成し、**HttpOnlyかつSecureなCookie**にセット                                            |
| Cookieの設定 | `HttpOnly`, `Secure`, `SameSite=Lax` などを付与し安全にセット                                                  |
| CORS設定     | - `Access-Control-Allow-Credentials: true` を返す<br>- `Access-Control-Allow-Origin` にフロントのURLを明示指定 |
| JWTの検証    | APIリクエスト時、CookieからJWTを読み取り、有効性を検証（フィルターなどで実装）                                 |
| 認証失敗時   | JWT無効や期限切れなら401 Unauthorized を返す                                                                   |

4. 全体の通信の流れイメージ
1. フロントがログイン情報を送信 → バックエンドがJWT発行し、HttpOnly Cookieに保存
1. フロントはCookieの管理を意識せず、axiosで withCredentials: true を設定
1. 以降のAPIリクエストにブラウザがCookieを自動付与し、サーバーはJWTを検証
1. JWT無効時はサーバーが401を返す → フロントはAxiosインターセプターで処理

1. まとめ
   | フロント側 | バックエンド側 |
   | -------------------------------- | --------------------------------------------------------- |
   | axiosの`withCredentials: true`を設定 | JWTをHttpOnly・SecureなCookieにセット |
   | 401エラーを共通インターセプターで検知しリダイレクト | JWTの検証ロジック（Cookieから読み込み） |
   | JWTの保存やヘッダー付与は不要 | CORSで`Access-Control-Allow-Credentials: true`と正しいOrigin設定 |
