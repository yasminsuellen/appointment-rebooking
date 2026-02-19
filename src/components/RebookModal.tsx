"use client";

import { useState } from "react";
import { Appointment } from "@/lib/mockData";
import {
  useGetAvailableSlotsQuery,
  useRebookAppointmentMutation,
} from "@/store/services/appointmentsApi";

interface Props {
  appointment: Appointment;
  onClose: () => void;
}

export default function RebookModal({ appointment, onClose }: Props) {
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { data: slots, isLoading: slotsLoading } = useGetAvailableSlotsQuery(
    appointment.specialty
  );

  const [rebookAppointment, { isLoading: rebooking, error }] =
    useRebookAppointmentMutation();

  const handleConfirm = async () => {
    if (!selectedSlotId) return;

    try {
      await rebookAppointment({
        appointmentId: appointment.id,
        slotId: selectedSlotId,
      }).unwrap();
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch {}
  };

  const formatSlotDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Rebook Appointment</h2>
            <p className="text-sm text-gray-500 mt-1">
              Select a new time slot for{" "}
              <span className="font-semibold text-indigo-600">
                {appointment.specialty}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="text-sm bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-indigo-700">
          Current appointment: <span className="font-semibold">{appointment.doctorName}</span>
        </div>

        {success ? (
          <div className="text-center py-6">
            <p className="text-2xl mb-2">✅</p>
            <p className="text-green-600 font-semibold">Appointment rebooked successfully!</p>
          </div>
        ) : (
          <>
            {slotsLoading ? (
              <p className="text-sm text-gray-400 text-center py-4">Loading available slots...</p>
            ) : (
              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                {slots && slots.length > 0 ? (
                  slots.map((slot) => {
                    const { date, time } = formatSlotDate(slot.scheduledAt);
                    const isSelected = selectedSlotId === slot.id;
                    return (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlotId(slot.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all ${
                          isSelected
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-100 hover:border-indigo-200 hover:bg-gray-50"
                        }`}
                      >
                        <p className="font-semibold text-gray-800 text-sm">{slot.doctorName}</p>
                        <p className="text-xs text-gray-500 mt-1">{date} at {time}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            {slot.type}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            R$ {slot.price.toFixed(2)}
                          </span>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-400 text-center py-4">
                    No available slots for this specialty.
                  </p>
                )}
              </div>
            )}

            {error && (
              <p className="text-sm text-red-500 text-center">
                Something went wrong. Please try again.
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!selectedSlotId || rebooking}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {rebooking ? "Confirming..." : "Confirm Rebook"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}