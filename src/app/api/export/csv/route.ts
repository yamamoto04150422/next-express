import { NextResponse } from "next/server";

export async function GET() {
  const csv = `id,name,email
1,Mock太郎,mock@example.com
2,Mock花子,mock2@example.com`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="mock.csv"',
    },
  });
}
