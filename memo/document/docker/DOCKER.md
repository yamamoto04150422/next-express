### 基本的な Docker Compose コマンド

1. **コンテナの起動**

   ```bash
   docker-compose up -d
   ```

   - `-d` オプションはバックグラウンドでコンテナを起動します。
   - フロントグラウンドで起動する場合は `docker-compose up` を使います。

2. **コンテナの停止**

   ```bash
   docker-compose down
   ```

   - コンテナを停止して、ネットワークやボリュームも削除します。
   - `docker-compose stop` はコンテナのみ停止し、ネットワークやボリュームは削除しません。

3. **コンテナの状態確認**

   ```bash
   docker-compose ps
   ```

   - 起動中のコンテナの状態を確認できます。

4. **コンテナのログの確認**

   ```bash
   docker-compose logs
   ```

   - コンテナのログを表示します。
   - 特定のサービスのログだけを表示する場合：
     ```bash
     docker-compose logs <サービス名>
     ```

5. **コンテナの再起動**

   ```bash
   docker-compose restart
   ```

   - コンテナを再起動します。特定のサービスを再起動する場合：
     ```bash
     docker-compose restart <サービス名>
     ```

6. **コンテナのビルド**

   ```bash
   docker-compose build
   ```

   - `docker-compose.yml` に基づいてコンテナイメージをビルドします。

7. **コンテナの再ビルド**

   ```bash
   docker-compose up --build
   ```

   - コンテナを再ビルドしてから起動します。

8. **コンテナの削除**

   ```bash
   docker-compose down --volumes
   ```

   - コンテナを停止して削除し、関連するボリュームも削除します。

9. **サービスのスケール**

   ```bash
   docker-compose up --scale <サービス名>=<数>
   ```

   - 特定のサービスをスケールして複数のインスタンスを起動できます。

10. **コンテナ内に入る（シェルを起動）**

    ```bash
    docker-compose exec <サービス名> sh
    ```

    - サービスのコンテナ内にシェルを起動します。例えば、`node` サービスのコンテナに入る場合：
      ```bash
      docker-compose exec node sh
      ```

11. **コンテナのリソース使用状況を確認**

    ```bash
    docker-compose top
    ```

    - 起動中のコンテナのリソース使用状況（プロセス）を確認します。

12. **コンテナの一時的な停止**

    ```bash
    docker-compose pause
    ```

    - コンテナを一時的に停止します。

13. **コンテナの再開**

    ```bash
    docker-compose unpause
    ```

    - 一時停止したコンテナを再開します。

14. **特定のサービスを削除せずに停止**
    ```bash
    docker-compose stop <サービス名>
    ```
    - 特定のサービスを停止しますが、コンテナは削除されません。

### デバッグ関連のコマンド

1. **コンテナの詳細情報の確認**

   ```bash
   docker-compose config
   ```

   - `docker-compose.yml` ファイルの内容を検証し、展開した設定を表示します。

2. **コンテナ内のファイルの確認**

   ```bash
   docker-compose exec <サービス名> ls /path/to/directory
   ```

   - サービスのコンテナ内で特定のディレクトリをリスト表示します。

3. **Docker Compose のバージョン確認**
   ```bash
   docker-compose --version
   ```
   - Docker Compose のバージョンを確認します。

### その他

1. **サービスの状態を強制的に停止**

   ```bash
   docker-compose kill
   ```

   - すべてのサービスを強制的に停止します。

2. **コンテナの状態確認（コンテナ名の取得）**
   ```bash
   docker ps
   ```
   - 現在稼働しているコンテナのリストを表示します。

### 注意

- **`docker-compose` と `docker` の違い**  
  `docker-compose` は複数のコンテナをまとめて管理するツールで、`docker` コマンドは個々のコンテナやイメージを管理するツールです。`docker-compose` を使うと、複数のコンテナをまとめてビルドや管理ができるため便利です。

これらのコマンドを組み合わせて使うことで、開発環境の構築や運用がスムーズに進むでしょう。
