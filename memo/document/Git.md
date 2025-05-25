# よく使う Git コマンド集

## ✅ 基本操作

### `git pull`

リモートの最新の変更をローカルに取り込む（fetch + merge）。

```bash
git pull origin develop
```

### `git checkout`

```
git checkout develop         # 既存ブランチへ移動
git checkout -b featureA     # 新しいブランチを作成して移動
```

### `git stash`

```
git stash save "フォーム編集途中"
git stash list
git stash apply "stash@{1}"
```

### `develop → feature ブランチ更新フロー`

```
git checkout develop
git pull origin develop

git checkout featureA
git pull origin featureA
git merge develop     # または git rebase develop
```
