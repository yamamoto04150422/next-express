# VS Code 設定ファイルまとめ

| ファイル名      | 役割               | 主な内容・例                                                                    |
| --------------- | ------------------ | ------------------------------------------------------------------------------- |
| settings.json   | エディタの挙動設定 | `"editor.formatOnSave": true`、インデント設定（`tabSize`, `insertSpaces` など） |
| extensions.json | 拡張機能の推奨設定 | `esbenp.prettier-vscode` などの拡張機能IDを指定                                 |
| tasks.json      | コマンドの自動化   | `npm run build`、`gcc main.c` などの実行手順を定義                              |
| launch.json     | デバッグの起動設定 | プログラムの開始点、環境変数、引数の設定                                        |
