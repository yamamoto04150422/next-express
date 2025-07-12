import { Affiliation } from "@/types/affiliation/Affiliation";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // ダミーデータを返却
  const affiliations: Affiliation[] = [
    { id: 1, name: "testing" },
    { id: 2, name: "playing" },
    { id: 3, name: "watching" },
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
