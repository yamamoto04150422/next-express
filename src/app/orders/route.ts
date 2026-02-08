import { NextRequest, NextResponse } from "next/server";

// モックデータ
const MOCK_ORDERS = [
  {
    id: 1,
    status: "PENDING",
    totalAmount: 15000,
    items: ["item1", "item2"],
  },
  {
    id: 2,
    status: "SHIPPED",
    totalAmount: 25000,
    items: ["item3", "item4", "item5"],
  },
  {
    id: 3,
    status: "DELIVERED",
    totalAmount: 8500,
    items: ["item6"],
  },
  {
    id: 4,
    status: "CANCELLED",
    totalAmount: 12000,
    items: ["item7", "item8"],
  },
];

/**
 * GET /api/orders - 注文一覧を取得する
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // クエリパラメータの取得
  const status = searchParams.get("status");
  const minAmount = searchParams.get("minAmount");
  const maxAmount = searchParams.get("maxAmount");

  let filteredOrders = MOCK_ORDERS;

  // ステータスでフィルタリング
  if (status) {
    filteredOrders = filteredOrders.filter((order) => order.status === status);
  }

  // 最小金額でフィルタリング
  if (minAmount) {
    const min = parseFloat(minAmount);
    filteredOrders = filteredOrders.filter((order) => order.totalAmount >= min);
  }

  // 最大金額でフィルタリング
  if (maxAmount) {
    const max = parseFloat(maxAmount);
    filteredOrders = filteredOrders.filter((order) => order.totalAmount <= max);
  }

  return NextResponse.json(filteredOrders);
}

/**
 * POST /api/orders - 新しい注文を登録する
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // バリデーション
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "items is required and must be a non-empty array" },
        { status: 400 }
      );
    }

    if (typeof body.totalAmount !== "number" || body.totalAmount <= 0) {
      return NextResponse.json(
        { error: "totalAmount is required and must be a positive number" },
        { status: 400 }
      );
    }

    // 新しい注文を作成
    const newOrder = {
      id: MOCK_ORDERS.length + 1,
      status: "PENDING",
      totalAmount: body.totalAmount,
      items: body.items,
      couponCode: body.couponCode || null,
    };

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
