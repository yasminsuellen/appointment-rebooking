import { NextResponse } from "next/server";
import { mockAppointments, mockTimeSlots } from "@/lib/mockData";

const appointments = [...mockAppointments];

export async function POST(request: Request) {
  const body = await request.json();
  const { appointmentId, slotId } = body;

  const appointmentIndex = appointments.findIndex((apt) => apt.id === appointmentId);

  if (appointmentIndex === -1) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
  }

  const appointment = appointments[appointmentIndex];

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

  appointments[appointmentIndex] = {
    ...appointment,
    doctorName: slot.doctorName,
    type: slot.type,
    scheduledAt: slot.scheduledAt,
    price: slot.price,
  };

  return NextResponse.json(appointments[appointmentIndex]);
}