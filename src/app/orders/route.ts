import { NextRequest, NextResponse } from "next/server";
import { OrderCreateRequest } from "@/app/openApi/generated/api/orderAndUserManagementAPI.schemas";
import { getOrderStore } from "@/app/orders/store";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as OrderCreateRequest;

    const created = getOrderStore().create(body);

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("[POST /orders] error", error);
    return NextResponse.json(
      { message: "failed to create order" },
      { status: 400 }
    );
  }
}

