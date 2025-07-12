import { Affiliation } from "@/types/affiliation/Affiliation";
import { NextResponse } from "next/server";

// APIエンドポイント: /api/affiliations
// このエンドポイントは、所属情報を取得するためのものです。
// curl "http://localhost:3000/api/affiliations?name="
export async function GET(request: Request) {
  // ダミーデータを返却
  const affiliations: Affiliation[] = [
    { id: 1, name: "人事部" },
    { id: 2, name: "営業部" },
    { id: 3, name: "経理部" },
  ];

  // クエリパラメータを取得
  const url = new URL(request.url);
  const searchName = url.searchParams.get("name");

  // 検索条件に一致するデータをフィルタリング
  const filteredAffiliations = searchName
    ? affiliations.filter((affiliation) =>
        affiliation.name.includes(searchName)
      )
    : affiliations;

  // 一致するデータを返却
  return NextResponse.json(filteredAffiliations);
}
