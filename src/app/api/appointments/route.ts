import { NextResponse } from "next/server";
import { appointmentsStore } from "@/lib/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const patientId = searchParams.get("patientId");

  const result = patientId
    ? appointmentsStore.filter((apt) => apt.patientId === patientId)
    : appointmentsStore;

  return NextResponse.json(result);
}