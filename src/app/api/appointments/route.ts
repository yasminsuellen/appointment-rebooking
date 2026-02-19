import { NextResponse } from "next/server";
import { mockAppointments } from "@/lib/mockData";

const appointments = [...mockAppointments];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const patientId = searchParams.get("patientId");

  const result = patientId
    ? appointments.filter((apt) => apt.patientId === patientId)
    : appointments;

  return NextResponse.json(result);
}