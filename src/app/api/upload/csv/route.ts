import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return new NextResponse("ファイルが見つかりません", { status: 400 });
    }

    // CSVの中身をテキストとして読み込む
    const text = await file.text();

    // ここでCSVをパースしたりDBに保存するなどの処理が可能
    console.log("アップロードされたCSV内容:", text);

    return new NextResponse("CSVを受け取りました！", { status: 200 });
  } catch (err) {
    console.error("CSVアップロードエラー:", err);
    return new NextResponse("サーバーエラー", { status: 500 });
  }
}
