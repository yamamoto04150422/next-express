# 外部サービスのアクセスついて

## 目次

- [質問 経由方法](#質問-経由方法)
  - [対策：バックエンド経由で外部APIを叩く](#対策バックエンド経由で外部apiを叩く)
- [外部APIとAPIキーの仕組み](#外部apiとapiキーの仕組み)
- [外部APIキー取得〜利用の流れ（一般的手順）](#外部apiキー取得利用の流れ一般的手順)

## 質問 経由方法

> セキュリティ的に「外部サービスへのアクセスはバックエンド経由が普通」か？

フロントエンド（ブラウザ）から直接アクセスする場合

```ts
fetch(`https://api.example.com/data?apikey=MY_SECRET_KEY`);
```

このように書くと、

APIキーが`JavaScriptファイルに埋め込まれる`

そのJavaScriptはブラウザがダウンロードするので、誰でも「ソースを表示」や「Networkタブ」でAPIキーを確認できてしまう

つまり、秘密にすべき情報が公開され**危険**

### 対策：バックエンド経由で外部APIを叩く

```ts
// app/api/weather/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.WEATHER_API_KEY; // ← サーバー専用、外部から見えない
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${apiKey}`
  );
  const data = await res.json();

  return NextResponse.json(data);
}
```

- APIキーは .env に保存 → サーバーのみが知っている
- ブラウザ側には一切漏れない

これが安全な`一般的な設計パターン`です。

# 外部APIとAPIキーの仕組み

| 用語                  | 説明                                                                                |
| --------------------- | ----------------------------------------------------------------------------------- |
| **外部API**           | 他の会社・組織が提供するWeb API（例：Google Maps、OpenWeatherMap、Twitterなど）。   |
| **APIキー (API Key)** | 外部APIを利用するために発行される「認証用の鍵」。誰がアクセスしているかを識別する。 |
| **利用登録**          | API提供元のサイトで開発者アカウントを作成し、APIキーを発行してもらうこと。          |
| **環境変数 (.env)**   | APIキーを安全に管理するためのファイル。Gitに含めず、`process.env`で参照する。       |
| **セキュリティ原則**  | APIキーを含む外部APIアクセスは**バックエンド（API Routes）側で行う**のが基本。      |

# 外部APIキー取得〜利用の流れ（一般的手順）

| 手順                             | 内容                                                    |
| -------------------------------- | ------------------------------------------------------- |
| ① サービス提供元サイトにアクセス | 例：Google Cloud / OpenWeatherMap / OpenAI など         |
| ② 開発者登録                     | メール認証などで開発者アカウントを作成                  |
| ③ アプリ登録                     | プロジェクト名・使用目的を登録                          |
| ④ APIキー発行                    | 利用可能なAPIキーが発行される（例：`abcd1234efgh5678`） |
| ⑤ 環境変数に設定                 | `.env.local` に `WEATHER_API_KEY=xxxx` のように記載     |
| ⑥ API Routesで利用               | `process.env.WEATHER_API_KEY` を使って安全に呼び出す    |
