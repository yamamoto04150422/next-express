# Git rebase + squash チートシート（Vim操作込み）

## 目的

複数のコミットを整理して履歴をきれいにする
（例：レビュー指摘ごとの修正を1つにまとめる）

## squashとは？

**複数のコミットを1つにまとめる概念**

実現方法の代表

> git rebase -i

※ PRの「Squash merge」はGitHub機能で別物

## HEADとは？

現在自分がいるコミットを指すポインタ

例：

> A --- B --- C --- D（HEAD）

## HEAD~n の意味

| 指定   | 意味         |
| ------ | ------------ |
| HEAD   | 今のコミット |
| HEAD~1 | 1つ前        |
| HEAD~2 | 2つ前        |

## 基本の流れ（最重要）

### STEP1：履歴を確認

```
git log --oneline
```

### STEP2：整理したい範囲を指定

直近2コミットを編集

```
git rebase -i HEAD~2
```

※ squashではなく
**「編集対象を指定しているだけ」**

### STEP3：Vimが開く

```
pick aaa fix: 指摘①
pick bbb fix: 指摘②
```

### STEP4：Vim操作

① INSERTモード

```
i
```

② squashしたいコミットを変更

```
pick aaa fix: 指摘①
s bbb fix: 指摘②
```

意味：

- ①を残す
- ②を①に吸収

### STEP5：保存して終了

```
Esc
:wq
Enter
```

### STEP6：コミットメッセージ整理

不要な行を削除

再度保存

```
Esc
:wq
Enter
```

## 完了

コミットが1つになる

## push時の注意

履歴を書き換えたため通常push不可

ローカルのみなら可能な気がした

```
git push --force-with-lease
```

※ チーム開発では慎重に

## よくあるミス

| ミス            | 理由             |
| --------------- | ---------------- |
| HEAD2と書く     | 正しくは HEAD~2  |
| Vim終了できない | Esc → :wq        |
| pushエラー      | force pushが必要 |

## 実務でのおすすめ運用

1. 1指摘 = 1コミット
1. 普段はrebase不要
1. 履歴が乱れた時だけ整理
1. PR前に整理する

## 理想のコミット例

```
fix: PR#45 指摘① null安全対応
fix: PR#45 指摘② useEffect依存修正
refactor: PR#45 指摘③ 命名修正
```

## ポイント

Git履歴は「作業ログ」ではなく「変更のストーリー」

## まとめ

1. コミットを積む
2. 履歴確認
3. rebase
4. squash
5. push
