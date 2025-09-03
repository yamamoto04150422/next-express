# フロントエンド観点（Next.js / SPA側）

| ヘッダー          | 使用ケース                                                        | 使用頻度 | 備考                              |
| ----------------- | ----------------------------------------------------------------- | -------- | --------------------------------- |
| `Authorization`   | JWTやOAuthのアクセストークンを付与してAPI呼び出し                 | ★★★★☆    | Cookie認証なら不要                |
| `Cookie`          | 認証セッションやCSRFトークンを送信                                | ★★★★☆    | `credentials: include` が必要     |
| `Accept`          | APIからJSON/CSVなど欲しい形式を指定                               | ★★★★☆    | REST API利用時はほぼ必須          |
| `Content-Type`    | APIリクエストで送信するデータ形式を指定（例: `application/json`） | ★★★★☆    | POST/PUT/PATCH時に必要            |
| `Accept-Language` | 多言語対応アプリでユーザーの希望言語を伝える                      | ★★☆☆☆    | i18nが必要な場合のみ              |
| `Cache-Control`   | データ更新頻度が高い場合にキャッシュを無効化                      | ★★★☆☆    | SPAはキャッシュの影響を受けやすい |

# バックエンド観点（Spring Boot側）

| ヘッダー                           | 使用ケース                                         | 使用頻度 | 備考                                     |
| ---------------------------------- | -------------------------------------------------- | -------- | ---------------------------------------- |
| `Access-Control-Allow-Origin`      | CORS対応。フロントとバックが別ドメインの場合に必須 | ★★★★☆    | 本番では特定ドメインを指定すべき         |
| `Access-Control-Allow-Credentials` | Cookie認証時に必要                                 | ★★★★☆    | JWT + Bearer 方式なら不要                |
| `Access-Control-Allow-Headers`     | カスタムヘッダー（Authorizationなど）を許可する    | ★★★★☆    | CORS設定とセット                         |
| `Set-Cookie`                       | セッションIDやリフレッシュトークンを付与           | ★★★★☆    | `HttpOnly`, `Secure`, `SameSite` が重要  |
| `Content-Type`                     | レスポンス形式を明示（JSON, CSV, Excelなど）       | ★★★★☆    | クライアントが正しく処理できるように必須 |
| `Content-Disposition`              | CSV/Excel/PDFなどをダウンロードさせる              | ★★☆☆☆    | ファイル出力がある場合のみ               |
| `X-Content-Type-Options`           | MIMEスニッフィング防止                             | ★★★☆☆    | Spring SecurityでデフォルトON            |
| `X-Frame-Options`                  | iframeによるクリックジャッキング対策               | ★★★☆☆    | デフォルトは `DENY`                      |
| `Content-Security-Policy` (CSP)    | XSSや外部リソース制御                              | ★★☆☆☆    | セキュリティ要件が強い場合に導入         |
