npm init playwright

[公式-next](https://ja.next-community-docs.dev/docs/app/building-your-application/testing/playwright)

[公式-playwright](https://playwright.dev/docs/test-use-options)

[参考サイト](https://devlog.mescius.jp/playwright-quickstart/)

[使い方](https://qiita.com/miruon/items/579d02eb26834259f034)

| **テスト種類**               | **日本語名**   | **目的**                                                             | **内容**                                                       | **ツール**                                                      |
| ---------------------------- | -------------- | -------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------- |
| **UT** (Unit Test)           | 単体テスト     | 関数やメソッドなど、最小単位のロジックを検証                         | 小さな単位でのコードの動作確認                                 | Jest, Mocha, Jasmine, React Testing Library                     |
| **ITA** (Integration Test A) | 統合テストA    | コンポーネント間の連携を検証                                         | 複数のモジュールが組み合わさったときに期待通り動作するかを確認 | Supertest, Jest (APIテスト), React Testing Library              |
| **ITB** (Integration Test B) | 統合テストB    | システムの一部（データベースや外部サービスとの接続）を含む統合テスト | 実際のデータベースや外部サービスと接続して動作を確認           | Docker, Postman, Jest（DB接続テスト）, React Testing Library    |
| **ST** (System Test)         | システムテスト | システム全体が仕様通りに動作するかを確認                             | フロントエンドからバックエンド、データベースまで全体をテスト   | Selenium, Cypress, Playwright, E2Eツール, React Testing Library |

**React Testing Library** は、特に **単体テスト** や **統合テストA** に使われるツールで、UIコンポーネントのテストや、複数のコンポーネント間の連携をテストする際に有用です。

toHaveScreenshotの場合は〇〇.spec.tsx直下にファイルが出力されるのでどう対処しようか
