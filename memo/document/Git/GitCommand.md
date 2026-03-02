# よく使う Git コマンド集

## 目的

日常開発で迷わず使えるコマンドセットを整理。

# 基本操作

## 最新を取得

| コマンド            | 意味                 | 使う場面             |
| ------------------- | -------------------- | -------------------- |
| `git fetch`         | リモート情報のみ更新 | 状態確認             |
| `git pull`          | fetch + merge        | 簡単に最新を取り込む |
| `git pull --rebase` | fetch + rebase       | 履歴をきれいに保つ   |

```
git pull origin develop
```

## ブランチ操作

| コマンド          | 意味                 | ポイント    |
| ----------------- | -------------------- | ----------- |
| `git branch`      | ブランチ一覧         | 状態確認    |
| `git checkout`    | ブランチ移動         | 従来方式    |
| `git switch`      | ブランチ移動（推奨） | 可読性      |
| `git checkout -b` | 作成＋移動           | feature作成 |
| `git switch -c`   | 作成＋移動           | 新方式      |

```
git checkout develop
git checkout -b featureA
```

## 作業退避

| コマンド          | 意味           | 使う場面     |
| ----------------- | -------------- | ------------ |
| `git stash`       | 変更を一時保存 | ブランチ切替 |
| `git stash list`  | 一覧           | 管理         |
| `git stash apply` | 復元           | 再作業       |
| `git stash pop`   | 復元＋削除     | 完全復帰     |

```
git stash save "フォーム編集途中"
git stash list
git stash apply "stash@{1}"
```

# develop → feature 更新フロー

## Merge

```
git checkout develop
git pull origin develop


git checkout featureA
git merge develop
```

特徴

- 安全
- 履歴が残る

## Rebase

```
git checkout develop
git pull origin develop


git checkout featureA
git rebase develop
```

特徴

- 履歴がきれい
- PRレビューしやすい

# タグ操作

## 注釈付きタグ

```
git tag -a v1.0.0 -m "First release"
```

## タグをプッシュ

```
git push --set-upstream origin xxx v1.0.0
```

# 追加しておくとよいコマンド

## 状態確認

| コマンド     | 意味       |
| ------------ | ---------- |
| `git status` | 現在の状態 |
| `git diff`   | 変更内容   |

## 履歴確認

| コマンド                                     | 意味                     |
| -------------------------------------------- | ------------------------ |
| `git log -p`                                 | 簡潔な履歴               |
| `git log --oneline`                          | 簡潔な履歴               |
| `git log --oneline --graph --decorate --all` | 履歴を美しく見る         |
| `git show`                                   | コミット詳細             |
| `git show <commit_id>`                       | 個別コミットの内容を確認 |

## トラブル対策

| コマンド  | 意味 |
| --------- | ---- |
| `git reve |      |
