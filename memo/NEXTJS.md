# nextjs 普段意識しないが利用している内容について

| 分類                 | 使用ライブラリ・特徴                                     | 開発者が普段意識しないが使っているもの       |
| -------------------- | -------------------------------------------------------- | -------------------------------------------- |
| **バンドラー**       | `webpack`（内部使用）                                    | ページごとのビルド、依存除去など             |
| **トランスパイル**   | `Babel`                                                  | JSX / TSX を JS に変換                       |
| **型チェック**       | `TypeScript`（公式対応）                                 | tsconfigは初期セットアップで生成される       |
| **スタイル**         | CSS Modules / Sass / Tailwind対応                        | `styled-jsx`もデフォルトサポートされる       |
| **ルーティング**     | App Router（`app/`ディレクトリ） or Pages Router（旧式） | ファイルベース自動ルーティング               |
| **画像最適化**       | `next/image`（内部で Sharp や Squoosh 使用）             | 圧縮・レスポンシブ画像生成                   |
| **フォント最適化**   | `next/font`（自動サブセット）                            | Google Fontsなどを効率的に使う               |
| **コード分割**       | dynamic import + Webpack                                 | ページごとに分割して初期表示を高速化         |
| **サーバー側API**    | `app/api/` や `pages/api/`                               | Expressのような軽量APIを自前で持つ           |
| **認証機構**         | `NextAuth.js` が統合しやすい構造                         | 認証用middlewareと統合しやすい               |
| **i18n（多言語化）** | 国際化機能が公式サポートされている                       | `i18n` を `next.config.js` で設定可能        |
| **環境変数**         | `.env.local`, `.env.production` など                     | webpack経由で `process.env` にバンドルされる |
| **静的サイト出力**   | SSG / ISR（Incremental Static Regeneration）             | ビルド時 or リクエスト時に静的生成           |
| **実行環境**         | Edge Runtime / Node Runtime                              | どちらかを選べる（middlewareやAPIで）        |
| **内部キャッシュ**   | Turbopack開発中、現状は `swc`/`webpack` でキャッシュ活用 | 同じコードの再ビルドを高速化                 |

# Next Auth

npm install next-auth @types/next-auth

[公式ドキュメント](https://next-auth.js.org/getting-started/client)
