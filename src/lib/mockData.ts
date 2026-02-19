export type AppointmentStatus = "scheduled" | "completed" | "cancelled";
export type AppointmentType = "chat" | "audio" | "video";
export type Specialty = "General Practice" | "Psychiatry" | "Pediatrics";

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  specialty: Specialty;
  type: AppointmentType;
  scheduledAt: string;
  status: AppointmentStatus;
  price: number;
}

export interface TimeSlot {
  id: string;
  doctorName: string;
  specialty: Specialty;
  type: AppointmentType;
  scheduledAt: string;
  price: number;
}

const now = new Date();

const addHours = (hours: number): string => {
  const date = new Date(now);
  date.setHours(date.getHours() + hours);
  return date.toISOString();
};

export const mockAppointments: Appointment[] = [
  {
    id: "apt-001",
    patientId: "patient-1",
    patientName: "Maria Silva",
    doctorName: "Dr. Nathan Toews",
    specialty: "General Practice",
    type: "chat",
    scheduledAt: addHours(48),
    status: "scheduled",
    price: 59.90,
  },
  {
    id: "apt-002",
    patientId: "patient-1",
    patientName: "Maria Silva",
    doctorName: "Dr. Bruno Hees Toews",
    specialty: "Psychiatry",
    type: "video",
    scheduledAt: addHours(12),
    status: "scheduled",
    price: 99.90,
  },
  {
    id: "apt-003",
    patientId: "patient-1",
    patientName: "Maria Silva",
    doctorName: "Dra. Roberta Oliveira",
    specialty: "Pediatrics",
    type: "audio",
    scheduledAt: addHours(72),
    status: "scheduled",
    price: 79.90,
  },
  {
    id: "apt-004",
    patientId: "patient-1",
    patientName: "Maria Silva",
    doctorName: "Dra. Keila Martha Hees",
    specialty: "General Practice",
    type: "video",
    scheduledAt: addHours(-24),
    status: "completed",
    price: 99.90,
  },
];

export const mockTimeSlots: TimeSlot[] = [
  {
    id: "slot-001",
    doctorName: "Dr. Nathan Toews",
    specialty: "General Practice",
    type: "chat",
    scheduledAt: addHours(96),
    price: 59.90,
  },
  {
    id: "slot-002",
    doctorName: "Dra. Keila Martha Hees",
    specialty: "General Practice",
    type: "audio",
    scheduledAt: addHours(100),
    price: 79.90,
  },
  {
    id: "slot-003",
    doctorName: "Dr. Bruno Hees Toews",
    specialty: "Psychiatry",
    type: "chat",
    scheduledAt: addHours(98),
    price: 59.90,
  },
  {
    id: "slot-004",
    doctorName: "Dr. Jonathan Hanan",
    specialty: "Psychiatry",
    type: "video",
    scheduledAt: addHours(120),
    price: 99.90,
  },
  {
    id: "slot-005",
    doctorName: "Dra. Roberta Oliveira",
    specialty: "Pediatrics",
    type: "audio",
    scheduledAt: addHours(104),
    price: 79.90,
  },
];