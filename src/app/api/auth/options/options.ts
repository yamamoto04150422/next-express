import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  debug: true,
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "Sample Project",
      credentials: {
        id: {
          label: "Id",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // credentials に入力が渡ってくる
        // 環境変数からIDとパスワードを取得
        const envId = process.env.CREDENTIALS_ID;
        const envPassword = process.env.CREDENTIALS_PASSWORD;

        // 入力された情報と比較
        if (
          credentials?.id === envId &&
          credentials?.password === envPassword
        ) {
          return { id: "29472084752894723890248902" }; // 任意のオブジェクトを返す
        }

        return null; // 認証失敗
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // profileの型を明示的に定義
        const userProfile = profile as {
          id: string;
          name: string;
          email: string;
          picture: string;
        };

        token.id = userProfile.id;
        token.email = userProfile.email;
        token.name = userProfile.name;
        token.image = userProfile.picture; // 画像URLも取得
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.image = token.image as string | null; // 画像URLをセッションに追加
      return session;
    },
  },
};
