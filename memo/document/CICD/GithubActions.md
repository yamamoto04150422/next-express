# GitHub Actions / CI・CD 振り返りまとめ

## なぜ CI/CD が必要か

ソフトウェアは **ユーザーに価値を届け続けること** が目的。

- 要件・環境・技術は目まぐるしく変化する
- 高品質で「正しく動く」ことが常に求められる
- 個人依存を減らし、**持続可能な開発** を行う必要がある

→ これらを支える仕組みとして **CI/CD** を導入する

## CI/CD とは

### CI（Continuous Integration / 継続的インテグレーション）

コードを **頻繁に統合** し、そのたびに自動チェックを行う考え方。

主な目的：

- テスト・ビルドを自動実行
- 変更による破壊を早期に検知
- 「動く状態」を常に担保する

例：

- PR 作成時にテストを自動実行
- main ブランチへのマージ前に品質チェック

### CD（Continuous Delivery / 継続的デリバリー）

**いつでもリリース可能な状態を保つ** ことが目的。

- 自動テストを通過した成果物を常にデプロイ可能にする
- 実際にリリースするかどうかは人が判断する

※ Continuous Deployment（自動リリース）とは区別されることが多い

### CI/CD のメリット

- ユーザー満足度の向上（品質・スピード）
- 手作業ミスの削減
- 開発者が **本質的な開発に集中できる**
- 品質基準の明文化・自動化

## GitHub CLI（gh）とは

GitHub を **コマンドラインから操作** する公式ツール。

主な用途：

- PR の作成・確認・マージ
- Issue 操作
- GitHub Actions の参照・手動実行

CI/CD を「ローカルから操作する」補助ツールという位置づけ。

## GitHub Actions とは

GitHub に組み込まれた **CI/CD 自動化プラットフォーム**。

できることの例：

- PR 作成時にビルド・テストを実行
- Issue 作成時に担当者を自動アサイン
- 定期バッチ処理の実行

### 基本構造

- **Workflow**：自動化全体の定義（YAML ファイル）
- **Event**：起動のきっかけ
- **Job**：実行単位
- **Runner**：実行環境
- **Step**：ジョブ内の処理単位

## ワークフロー（Workflow）

- `.github/workflows/*.yml` に定義
- 「いつ」「何を」「どこで」実行するかを書く

ワークフローの流れ：

1. イベント発生
2. ランナー上でジョブが起動
3. ジョブ内のステップが順に実行される

## GitHub イベント（起動トリガー）

- push
- pull_request
- issues
- issue_comment
- create
- delete
- fork
- release
- workflow_dispatch
- schedule
- watch
- workflow_run

### 手動実行

- `workflow_dispatch` を指定すると手動実行可能

### 定期実行（schedule）

- `on.schedule` に `cron` 形式で指定

注意点：

- タイムゾーンは **UTC**
- 厳密な時刻通りに起動しない場合がある

## ジョブ（Job）とは

- ワークフロー内の **実行単位**
- 複数定義可能
- デフォルトでは **並列実行**
- `needs` を指定すると依存関係を表現できる

## ランナー（Runner）とは

ジョブを実行する **実行環境**。

### GitHub-hosted runner

基本はこれで十分。

対応 OS：

- Linux
- Windows
- macOS

主なプリインストール内容：

- 言語 / ランタイム：Node.js / Java / Python
- パッケージ管理：npm / Maven
- ツール：Docker / AWS CLI
- ブラウザ：Chrome（Selenium 用）

### Self-hosted runner

- 自前で用意する実行環境
- 運用コストが高い
- 特別な理由がなければ不要

## ステップ（Step）とは

- ジョブ内の最小実行単位
- 以下のいずれかを実行
  - `run`：シェルコマンド
  - `uses`：Action の利用

ステップは上から順に実行される。

## 実行時エラーと終了ステータス

- コマンドの **終了ステータス** で成功 / 失敗を判定
- `0`：正常終了
- `0` 以外：エラー扱い → ワークフロー失敗

CI が落ちる = 品質ゲートに引っかかった状態。

## 課金モデル（GitHub Actions）

### 使用時間課金

- 実行時間 × ランナーごとの倍率

### ストレージ課金

- Actions の成果物・キャッシュ容量

※ GitHub Free プランでは月ごとの無料枠あり

## まとめ

- GitHub Actions は **CI/CD を GitHub 上で完結** させる仕組み
- 「自動化できる品質チェック」を増やすほど開発は安定する
- まずは PR 時のテスト自動化から始めるのが王道

振り返り・学習用途としては
**構造（Workflow / Job / Step）を意識して読む・書く** のが重要

## コンテキストの一覧

GitHub Actions では、実行時にさまざまな **コンテキスト（context）** が提供される。
コンテキストはワークフローの状態・イベント・実行環境などの情報を参照するための仕組み。

### 設計時の考慮点（重要）

1. **コンテキストはシェルコマンドに直接ハードコードしない**

   一度環境変数に渡してから利用することで、可読性・安全性・再利用性が向上する

2. **環境変数は必ずダブルクォーテーションで囲む**

   空白や特殊文字による予期せぬ挙動を防ぐため

### GitHub コンテキスト

`github` コンテキストは、**ワークフローを起動した GitHub 側の情報** を保持する。

主な内容：

- リポジトリ情報（`repository`）
- イベント情報（`event`）
- ブランチ・タグ（`ref`, `ref_name`）
- 実行者（`actor`）

使用例：

```yaml
- run: echo "${GITHUB_REF}"
  env:
    GITHUB_REF: ${{ github.ref }}
```

※ `github.event` 以下には Webhook の payload がそのまま入る

### Runner コンテキスト

`runner` コンテキストは、**ジョブを実行しているランナー環境** に関する情報を提供する。

主な内容：

- OS（`os`）
- アーキテクチャ（`arch`）
- ランナー名（`name`）

使用例：

```yaml
- run: echo "${RUNNER_OS}"
  env:
    RUNNER_OS: ${{ runner.os }}
```

## 環境変数

GitHub Actions では、ワークフロー・ジョブ・ステップ単位で **環境変数（env）** を定義できる。

ここで重要なのは、**env は値の「保管場所」ではなく「受け渡し手段」** である点。

- Variables / Secrets：値を **保存・管理** するための仕組み
- env：実行時に **shell や Action に値を渡すための仕組み**

### 環境変数を定義する例

```yaml
env:
  NODE_ENV: "production"
```

### デフォルト環境変数

GitHub Actions が **自動で用意する環境変数**。

例：

- `GITHUB_WORKFLOW`
- `GITHUB_RUN_ID`
- `GITHUB_SHA`
- `GITHUB_REF`

→ これらは内部的には GitHub コンテキストの値が展開されたもの

### 中間環境変数

- コンテキスト / Variables / Secrets の値を **env に詰め替えたもの**
- シェルコマンドや Action で再利用するために使う

例：

```yaml
- run: echo "${BRANCH}"
  env:
    BRANCH: ${{ github.ref_name }}
```

## Variables

GitHub の **Variables（変数）機能** は、複数のワークフローで共通利用したい値を **安全に管理するための仕組み**。

特徴：

- Repository / Environment / Organization 単位で定義可能
- YAML の式 (`${{ }}`) 内でのみ参照可能
- shell からは **直接参照できない**

用途例：

- 環境名（`stg`, `prod`）
- API のエンドポイント
- feature flag

👉 **Variables は必ず env を経由して shell に渡す**

例：

```yaml
env:
  API_BASE_URL: "${{ vars.API_BASE_URL }}"
```

---

## Secrets

**機密情報（トークン・パスワードなど）** を扱うための仕組み。

特徴：

- 原則ログ出力しない
- 登録時に暗号化される
- ログに出力されても自動で **マスク処理** される

注意点：

- `echo` などで意図的に出さない
- fork PR では使用制限あり

## 式で利用できる内容

`${{ }}` の中では **GitHub Actions 独自の式言語** が使える。

### リテラル

- 文字列：`'text'`
- 数値：`123`
- 真偽値：`true / false`
- null：`null`

### 演算子

- 比較：`==`, `!=`, `<`, `>`
- 論理：`&&`, `||`, `!`

⚠ **異なる型の比較はバグの温床** になるため避ける

### オブジェクトフィルター

オブジェクトのプロパティを参照可能。

例：

```yaml
${{ github.event.pull_request.html_url }}
```

※ ネストが深くなるほど null 参照に注意

### 関数

| 内容         | 関数              | 説明                            | 主な用途       |
| ------------ | ----------------- | ------------------------------- | -------------- |
| 文字列比較   | contains()        | 第1引数が第2引数を含む場合 true | 条件分岐       |
| 文字列比較   | startsWith()      | 指定文字列で始まるか            | ブランチ判定   |
| 文字列比較   | endsWith()        | 指定文字列で終わるか            | ファイル判定   |
| 文字列生成   | format() / join() | 文字列組み立て                  | ログ・通知     |
| JSON 操作    | toJson()          | オブジェクトを JSON 化          | デバッグ       |
| JSON 操作    | fromJson()        | JSON をオブジェクト化           | 特殊用途       |
| ハッシュ生成 | hashFiles()       | ファイルのハッシュを生成        | キャッシュキー |

## 補足まとめ

- **Context → env → shell** の流れを意識する
- Variables / Secrets は「保管」、env は「受け渡し」
- Variables だけでは shell では使えない
- Secrets / Variables / Context を直接 `run` に書かない
- 式は読みやすさ優先（複雑なら step を分ける）

env を使うことは推奨設計であり、Variables の代替ではない

安全性・保守性を高めるための重要な基礎知識
