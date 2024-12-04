import { SiteStats } from "@/types/siteStats/SiteStats";
import { NextResponse } from "next/server";

const statsData: SiteStats = {
  totalUsers: 1200,
  totalArticles: 350,
  dailyActiveUsers: 89,
};

export async function GET() {
  return NextResponse.json(statsData, {
    headers: {
      "Cache-Control": "s-maxage=10, stale-while-revalidate",
    },
  });
}
