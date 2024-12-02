import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 認証が不要なパス
const publicPaths = ["/", "/login", "/sample"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 公開パスの場合は次の処理へ進む
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // 認証用のトークンを取得
  const token =
    req.cookies.get("next-auth.session-token") ||
    req.cookies.get("__Secure-next-auth.session-token");

  // トークンがない場合はログインページにリダイレクト
  if (!token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/";
    return NextResponse.redirect(loginUrl);
  }

  // トークンがある場合は次の処理へ進む
  return NextResponse.next();
}

// Middlewareが適用されるパスの設定
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)", // APIや静的リソースを除外
};
