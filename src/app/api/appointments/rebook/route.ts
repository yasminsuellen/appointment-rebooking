import { NextResponse } from "next/server";
import { mockTimeSlots } from "@/lib/mockData";
import { appointmentsStore } from "@/lib/store";

export async function POST(request: Request) {
  const body = await request.json();
  const { appointmentId, slotId } = body;

  const appointmentIndex = appointmentsStore.findIndex((apt) => apt.id === appointmentId);

  if (appointmentIndex === -1) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
  }

  const appointment = appointmentsStore[appointmentIndex];

  const hoursDiff = (new Date(appointment.scheduledAt).getTime() - Date.now()) / (1000 * 60 * 60);

  if (hoursDiff < 24) {
    return NextResponse.json(
      { error: "Appointment cannot be rebooked within 24 hours" },
      { status: 400 }
    );
  }

  const slot = mockTimeSlots.find((s) => s.id === slotId);

  if (!slot) {
    return NextResponse.json({ error: "Time slot not found" }, { status: 404 });
  }

  if (slot.specialty !== appointment.specialty) {
    return NextResponse.json(
      { error: "Cannot rebook to a different specialty" },
      { status: 400 }
    );
  }

  appointmentsStore[appointmentIndex] = {
    ...appointment,
    doctorName: slot.doctorName,
    type: slot.type,
    scheduledAt: slot.scheduledAt,
    price: slot.price,
  };

  return NextResponse.json(appointmentsStore[appointmentIndex]);
}