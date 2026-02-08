import { NextRequest, NextResponse } from "next/server";

// モックデータ（親ファイルと同じデータ）
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
 * GET /api/orders/{orderId} - 特定の注文の詳細を取得する
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId: orderIdStr } = await params;
  const orderId = parseInt(orderIdStr, 10);

  if (isNaN(orderId)) {
    return NextResponse.json({ error: "Invalid orderId" }, { status: 400 });
  }

  const order = MOCK_ORDERS.find((o) => o.id === orderId);

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
}

/**
 * PUT /api/orders/{orderId} - 特定の注文全体を完全更新する
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId: orderIdStr } = await params;
  const orderId = parseInt(orderIdStr, 10);

  if (isNaN(orderId)) {
    return NextResponse.json({ error: "Invalid orderId" }, { status: 400 });
  }

  const orderIndex = MOCK_ORDERS.findIndex((o) => o.id === orderId);

  if (orderIndex === -1) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  try {
    const body = await request.json();
    MOCK_ORDERS[orderIndex] = {
      ...MOCK_ORDERS[orderIndex],
      ...body,
      id: orderId,
    };
    return NextResponse.json(MOCK_ORDERS[orderIndex]);
  } catch (error) {
    console.log("エラー", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

/**
 * PATCH /api/orders/{orderId} - 特定の注文データの一部のみを部分更新する
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId: orderIdStr } = await params;
  const orderId = parseInt(orderIdStr, 10);

  if (isNaN(orderId)) {
    return NextResponse.json({ error: "Invalid orderId" }, { status: 400 });
  }

  const orderIndex = MOCK_ORDERS.findIndex((o) => o.id === orderId);

  if (orderIndex === -1) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  try {
    const body = await request.json();
    MOCK_ORDERS[orderIndex] = { ...MOCK_ORDERS[orderIndex], ...body };
    return NextResponse.json(MOCK_ORDERS[orderIndex]);
  } catch (error) {
    console.log("エラー", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/orders/{orderId} - 特定の注文を削除する
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId: orderIdStr } = await params;
  const orderId = parseInt(orderIdStr, 10);

  if (isNaN(orderId)) {
    return NextResponse.json({ error: "Invalid orderId" }, { status: 400 });
  }

  const orderIndex = MOCK_ORDERS.findIndex((o) => o.id === orderId);

  if (orderIndex === -1) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  MOCK_ORDERS.splice(orderIndex, 1);
  return new NextResponse(null, { status: 204 });
}
