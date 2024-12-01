# スクリプトがあるディレクトリに移動
cd "$(dirname "$0")"

# Docker ComposeでSwagger Codegenを実行
docker-compose run --rm swagger-codegen