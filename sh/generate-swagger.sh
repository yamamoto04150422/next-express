
# Dockerイメージのビルド
echo "Building Docker image for Swagger Codegen..."
docker build -t swagger-codegen -f src/app/openApi/Dockerfile.codegen src/app/openApi

if [ $? -ne 0 ]; then
  echo "Docker image build failed!"
  exit 1
fi

# Swagger Codegenの実行
echo "Running Swagger Codegen..."
docker run --rm -v "$(pwd)/src/app/openApi:/local" swagger-codegen

if [ $? -ne 0 ]; then
  echo "Swagger Codegen execution failed!"
  exit 1
fi

echo "Swagger TypeScript client code generation complete!"
