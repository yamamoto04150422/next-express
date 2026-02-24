# SPAバックエンド（Spring Boot）テスト戦略まとめ

## テスト範囲レベル（どこまで動かすか）

| Lv  | テスト範囲                                           | 主な対象   | 目的                               | 実施フェーズ |
| --- | ---------------------------------------------------- | ---------- | ---------------------------------- | ------------ |
| Lv1 | ロジックのみ（Serviceのみ・DBなし・APIなし）         | Service    | 業務ロジックを守る                 | 実装中       |
| Lv2 | API層（Controller + JSON・ServiceはMock）            | Controller | API契約（JSON・ステータス）を守る  | API完成      |
| Lv3 | DB層（Repository + DB・SQL確認）                     | Repository | SQLを守る                          | DB設計完了   |
| Lv4 | アプリ全体（Controller + Service + Repository + DB） | 全体       | 配線（DI・トランザクション）を守る | 機能完成     |
| Lv5 | SPA連携（フロント + API + DB）                       | E2E        | 本番再現                           | リリース前   |

## 具体的な実施方法

### Lv1：Service単体（最重要）

- Mockito使用
- RepositoryはMock
- 境界値・例外・分岐を網羅
- DBは使わない

### Lv2：API契約テスト

- @WebMvcTest
- ServiceはMock
- HTTPステータス確認（200/400/401/403/500）
- JSON構造確認（jsonPath）
- バリデーション確認
- ExceptionHandler確認

### Lv3：Repositoryテスト

- @DataJpaTest
- H2やTestContainer使用
- 実際にINSERTして検索確認
- 複雑な条件検索のみ重点的に

### Lv4：結合テスト

- @SpringBootTest
- 実DB使用
- トランザクション確認
- 認証処理確認
- 例外変換確認

### Lv5：E2E

- フロントからAPI実行
- PlaywrightやCypress
- 本番に近い環境で確認

## SPA案件の実務バランス目安

Service単体 50%
API契約テスト 30%
Repository 10%
結合テスト 10%
E2E 必要最低限

## SPA特有の重要ポイント

1. JSON破壊が最大事故
   → フロント（TypeScript）との契約を守る

2. HTTPステータス必須テスト
   → 200だけでなくエラー系も確認

3. 共通エラーフォーマットを保証

4. 認証・認可（JWTなど）をテスト

## よくある失敗

・Serviceしかテストしない
・JSON構造を検証しない
・例外パターン未確認
・結合テストゼロ
・Repositoryを全部モックして満足

## 結論

テストは「フェーズ」ではなく「範囲」で整理する。

Lv1 → Lv2 → Lv3 → Lv4 → Lv5
と段階的に積み上げるのが正解。

SPAバックエンドでは
「Service単体」＋「API契約テスト」が最重要。

※API契約テストとは`JSONとステータス`付近
