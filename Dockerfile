FROM node:20-alpine

# 作業ディレクトリ
WORKDIR /app

# パッケージインストール用に必要なファイルをコピー
COPY package*.json ./

# パッケージインストール
RUN npm install

# アプリケーションファイルをコピー
COPY . .

# Next.js のビルド
RUN npm run build

# ポートを公開
EXPOSE 3000

# アプリケーションの起動
CMD ["npm", "run", "start"]
