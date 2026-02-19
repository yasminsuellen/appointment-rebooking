import { NextResponse } from "next/server";
import { mockTimeSlots } from "@/lib/mockData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const specialty = searchParams.get("specialty");

  const result = specialty
    ? mockTimeSlots.filter((slot) => slot.specialty === specialty)
    : mockTimeSlots;

  return NextResponse.json(result);
}