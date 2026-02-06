import { NextRequest, NextResponse } from "next/server";
import {
  ValidationResult,
  ValidateOrderParams,
} from "@/app/openApi/generated/api/orderAndUserManagementAPI.schemas";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const params: ValidateOrderParams = {
    couponCode: searchParams.get("couponCode") ?? undefined,
    amount: Number(searchParams.get("amount") ?? 0),
  };

  let result: ValidationResult;

  if (Number.isNaN(params.amount) || params.amount <= 0) {
    result = {
      isValid: false,
      message: "amount は 1 以上の数値を指定してください。",
    };
  } else if (params.couponCode && !params.couponCode.startsWith("PROMO")) {
    result = {
      isValid: false,
      message: "クーポンコードは 'PROMO' で始まる必要があります。",
    };
  } else {
    result = {
      isValid: true,
      message: "注文データは有効です。",
    };
  }

  return NextResponse.json(result, { status: 200 });
}

