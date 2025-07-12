import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ここでDB保存やバリデーション処理などを実施
    console.log("受信データ", body);

    // 成功レスポンス
    return NextResponse.json({ message: "登録成功" }, { status: 200 });
  } catch (error) {
    console.error("エラー", error);
    return NextResponse.json({ error: "登録失敗" }, { status: 500 });
  }
}
