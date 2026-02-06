import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/app/openApi/generated/api/orderAndUserManagementAPI.schemas";
import { getOrderStore } from "@/app/orders/store";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;
  const id = Number(orderId);

  const order = getOrderStore().get(id);
  if (!order) {
    return NextResponse.json(
      { message: "order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(order, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;
  const id = Number(orderId);
  const store = getOrderStore();
  const existing = store.get(id);

  if (!existing) {
    return NextResponse.json(
      { message: "order not found" },
      { status: 404 }
    );
  }

  const body = (await req.json()) as Order;

  // 完全更新: 受け取った値で上書き
  const updated = store.replace(id, body);

  if (!updated) {
    return NextResponse.json(
      { message: "order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(updated, { status: 200 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;
  const id = Number(orderId);
  const store = getOrderStore();
  const existing = store.get(id);

  if (!existing) {
    return NextResponse.json(
      { message: "order not found" },
      { status: 404 }
    );
  }

  const body = (await req.json()) as Order;

  const updated = store.patch(id, body);

  if (!updated) {
    return NextResponse.json(
      { message: "order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(updated, { status: 200 });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;
  const id = Number(orderId);
  const deleted = getOrderStore().delete(id);

  if (!deleted) {
    return NextResponse.json(
      { message: "order not found" },
      { status: 404 }
    );
  }

  return new NextResponse(null, { status: 204 });
}

