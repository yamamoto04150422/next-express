import { Affiliation } from "@/types/affiliation/Affiliation";
import { NextResponse } from "next/server";

export async function GET() {
  // ダミーデータを返却
  const affiliations: Affiliation[] = [
    { id: 1, name: "営業部" },
    { id: 2, name: "技術部" },
    { id: 3, name: "人事部" },
  ];

  return NextResponse.json(affiliations);
}
