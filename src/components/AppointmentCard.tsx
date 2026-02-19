"use client";

import { Appointment } from "@/lib/mockData";

interface Props {
  appointment: Appointment;
  onRebook: (appointment: Appointment) => void;
}

const typeLabel: Record<string, string> = {
  chat: "Chat",
  audio: "Audio",
  video: "Video",
};

const statusStyles: Record<string, string> = {
  scheduled: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AppointmentCard({ appointment, onRebook }: Props) {
  const scheduledDate = new Date(appointment.scheduledAt);
  const hoursUntil = (scheduledDate.getTime() - Date.now()) / (1000 * 60 * 60);
  const canRebook = appointment.status === "scheduled" && hoursUntil > 24;

  const formattedDate = scheduledDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = scheduledDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-1">
            {appointment.specialty}
          </p>
          <h3 className="text-lg font-bold text-gray-800">{appointment.doctorName}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {formattedDate} at {formattedTime}
          </p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[appointment.status]}`}>
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
            {typeLabel[appointment.type]}
          </span>
          <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
            R$ {appointment.price.toFixed(2)}
          </span>
        </div>

        {canRebook && (
          <button
            onClick={() => onRebook(appointment)}
            className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors px-4 py-2 rounded-xl"
          >
            Rebook
          </button>
        )}

        {appointment.status === "scheduled" && !canRebook && hoursUntil > 0 && (
          <span className="text-xs text-gray-400 italic">
            Cannot rebook within 24h
          </span>
        )}
      </div>
    </div>
  );
}