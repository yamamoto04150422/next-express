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

## if: 条件式の実践パターン集

`if:` を使うことで、**ジョブやステップの実行可否を条件付きで制御**できる。
CI/CD の無駄な実行を減らし、意図を明確にするために重要。

### 条件分岐の基本

- `if:` は **Job / Step の両方に指定可能**
- 式は `${{ }}` を省略して書くのが推奨

```yaml
- name: Run only on main
  if: github.ref_name == 'main'
  run: echo "main branch"
```

### ステータスチェック関数

前の処理結果に応じて条件分岐するための関数。

| 関数        | 意味                 | 主な用途     |
| ----------- | -------------------- | ------------ |
| success()   | それまでの処理が成功 | 通常処理     |
| failure()   | どこかで失敗         | エラー時処理 |
| cancelled() | キャンセルされた     | 中断検知     |
| always()    | 常に true            | 後処理・通知 |

#### 実践例

```yaml
- name: Notify on failure
  if: failure()
  run: echo "Job failed"
```

※ `failure()` が最もよく使われる

## ログ出力について

### 読みやすいログの基本

- **ジョブ名・ステップ名を必ず付ける**
- 何をしているステップかがログから一目で分かる

```yaml
- name: Echo greeting
  run: echo "hello"
```

### ワークフロー実行名

実行一覧で誰が起動したか分かるようにする。

```yaml
run-name: "Run by ${{ github.actor }}"
```

## ステップ間のデータの共有

ステップ間で値を共有する場合は、**専用の仕組みを使う**。

### GITHUB_OUTPUT（推奨）

- 可読性が高い
- 現在の推奨方法

```yaml
- name: Set output
  run: echo "result=ok" >> "$GITHUB_OUTPUT"

- name: Use output
  run: echo "${{ steps.set.outputs.result }}"
```

### GITHUB_ENV

- 後続ステップで使える環境変数を設定

```yaml
- run: echo "FOO=bar" >> "$GITHUB_ENV"
```

### その他の関連環境変数

- `GITHUB_HEAD_REF`：PR 元ブランチ名

## GitHub API の利用

### GitHub Token

GitHub Actions では、API 利用のためのトークンが **自動生成** される。

参照方法：

- `${{ secrets.GITHUB_TOKEN }}`
- `${{ github.token }}`

特徴：

- 明示的に発行不要
- リポジトリ権限に応じたスコープ
- API / gh CLI から利用可能

## スターターワークフロー

GitHub には **公式のスターターワークフロー** が用意されている。

特徴：

- 言語・用途別のベストプラクティス
- CI 設計のリファレンスとして有用

👉 「ゼロから書かない」「迷ったらスターターを見る」が基本

## Event（イベント）

GitHub Actions は **イベント** を起点にワークフローを実行する。

代表例：`push` / `pull_request` / `workflow_dispatch` など。

```yaml
on:
  pull_request:
    paths: ["src/**"]
```

## イベントのフィルタリング

イベント発火を **条件で絞り込む** 仕組み。

主に「どの変更・どのブランチ・どのタグか」を指定する。

### フィルターの種類と注意点

1. **ignore 系と通常指定は併用不可**
   - `paths` と `paths-ignore`
   - `branches` と `branches-ignore`

2. **系統が違う条件は OR 条件になる** ⚠️
   - `paths` と `branches` は OR
   - 両方満たす必要はない点に注意

### フィルター一覧

| フィルター        | 内容                             |
| ----------------- | -------------------------------- |
| `paths`           | 指定したパスが変更された場合のみ |
| `paths-ignore`    | 指定したパス以外が変更された場合 |
| `branches`        | 指定したブランチのみ             |
| `branches-ignore` | 指定したブランチ以外             |
| `tags`            | 指定したタグのみ                 |
| `tags-ignore`     | 指定したタグ以外                 |

## Glob パターン

パス・ブランチ指定で使われる記法。

| 記号 | 意味                    |
| ---- | ----------------------- |
| `*`  | `/` を除く0文字以上     |
| `**` | `/` を含む0文字以上     |
| `?`  | 任意の1文字             |
| `+`  | 直前のパターンを1回以上 |
| `[]` | 文字クラス              |
| `!`  | 否定                    |

## アクティビティタイプ

一部イベント（例：`pull_request`）は **操作の種類** まで指定可能。

```yaml
on:
  pull_request:
    types: [opened, synchronize]
```

例：

- `opened`
- `synchronize`
- `closed`

👉 **イベント + フィルター + アクティビティタイプ** で発火条件を細かく制御する

## 補足まとめ

- **Context → env → shell** の流れを意識する
- Variables / Secrets は「保管」、env は「受け渡し」
- Variables だけでは shell では使えない
- Secrets / Variables / Context を直接 `run` に書かない
- 式は読みやすさ優先（複雑なら step を分ける）

env を使うことは推奨設計であり、Variables の代替ではない

- `if:` は **無駄な実行を減らす最重要機能**
- `failure()` + `always()` は覚えておく
- ログは後から読む前提で書く
- ステップ間共有は `GITHUB_OUTPUT` を使う
- GitHub API は `GITHUB_TOKEN` をまず使う

安全性・保守性を高めるための重要な基礎知識
