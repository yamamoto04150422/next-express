import { Employee } from "@/types/employee/Employee";
import { NextResponse } from "next/server";

export async function GET() {
  const employees: Employee[] = [
    { id: 1, name: "佐藤 太郎", position: "営業部長", department: "営業部" },
    { id: 2, name: "鈴木 次郎", position: "技術部長", department: "技術部" },
    { id: 3, name: "高橋 三郎", position: "人事部長", department: "人事部" },
  ];

  return NextResponse.json(employees);
}
