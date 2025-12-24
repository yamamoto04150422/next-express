# Spring Boot REST API バックエンド 全体整理（学習用）

## 目的

REST API のバックエンドを実装する際に登場する
Controller / Service / Helper / Repository / DAO / Entity / QueryEntity / DTO
の**役割・責務・使い分け**を一度で振り返るためのまとめ。

---

## 全体像（流れ）

```
[Client]
   ↓ HTTP
[Controller]
   ↓ DTO
[Service]
   ↓ Entity / QueryEntity
[Repository]
   ↓
[DAO]
   ↓ SQL
[Database]
```

※ 小規模な場合は Repository = DAO としてまとめることもある

---

## レイヤ別の役割

### 1. Controller

**役割**

- HTTPリクエスト / レスポンスの窓口
- REST API の責務を持つ

**主な仕事**

- リクエストDTOの受け取り
- バリデーション
- Service 呼び出し
- レスポンスDTOの返却

**使う型**

- Request DTO
- Response DTO

**やってはいけないこと**

- 業務ロジック
- SQL / DB操作
- Entity操作

---

### 2. Service

**役割**

- 業務ロジックの中心
- 各レイヤ間の翻訳者

**主な仕事**

- 業務ルールの実装
- Entity / QueryEntity の組み立て
- DTO ⇔ Entity 変換
- トランザクション制御

**使う型**

- Entity
- QueryEntity
- DTO（変換用）

**ポイント**

- 「何をするか」は Service に集約する

---

### 3. Helper（Utility / Converter）

**役割**

- 共通処理の切り出し

**主な仕事**

- DTO ⇔ Entity 変換
- 日付・文字列加工
- 計算ロジック（業務判断を含まない）

**注意点**

- 業務ルールは書かない
- 状態を持たせない

---

### 4. Repository

**役割**

- 永続化の窓口
- 業務的な DB アクセス単位

**主な仕事**

- Entity の保存・取得
- QueryEntity の取得
- DAO の呼び出し

**使う型**

- Entity
- QueryEntity

**ポイント**

- Service から見た「DBの入口」

---

### 5. DAO（Data Access Object）

**役割**

- SQL 実行専用レイヤ

**主な仕事**

- SQL を書く
- パラメータバインド
- ResultSet を Entity / QueryEntity に詰める

**使う型**

- Entity
- QueryEntity

**補足**

- MyBatis では Mapper = DAO
- JPA では DAO を明示的に作らないことも多い

---

## データ構造（型）の役割

### Entity

**役割**

- DB の table / view を表す永続モデル

**特徴**

- DB構造と1:1
- CRUD の対象

**主な利用先**

- Service
- Repository
- DAO

---

### QueryEntity

**役割**

- 複雑な SELECT（JOIN）の結果

**特徴**

- 読み取り専用
- 更新・保存しない

**主な利用先**

- Repository
- Service

---

### DTO（Data Transfer Object）

**役割**

- データ転送専用

**特徴**

- API仕様に依存
- 加工・集計OK

**主な利用先**

- Controller
- Service（変換用）

---

## 型 × レイヤ対応表

| レイヤ     | Entity | QueryEntity | DTO |
| ---------- | ------ | ----------- | --- |
| Controller | ×      | ×           | ○   |
| Service    | ○      | ○           | ○   |
| Helper     | △      | △           | ○   |
| Repository | ○      | ○           | ×   |
| DAO        | ○      | ○           | ×   |

---

## 設計判断の簡易フロー

```
APIの入出力？ → DTO
DBの1テーブル？ → Entity
JOIN結果？ → QueryEntity
SQLを書く？ → DAO
業務判断？ → Service
```

---

## 一言まとめ

- Controller：HTTP担当
- Service：業務の心臓
- Repository：DBの窓口
- DAO：SQL職人
- Entity：DBの事実
- QueryEntity：検索結果
- DTO：伝達用データ

---

> この構成を守れば、REST API バックエンドは破綻しにくくなる。
