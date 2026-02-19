"use client";

import { useState } from "react";
import { Appointment } from "@/lib/mockData";
import { useGetAppointmentsQuery } from "@/store/services/appointmentsApi";
import AppointmentCard from "./AppointmentCard";
import RebookModal from "./RebookModal";

const PATIENT_ID = "patient-1";

export default function AppointmentList() {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const { data: appointments, isLoading, isError } = useGetAppointmentsQuery(PATIENT_ID);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400 text-sm">Loading appointments...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-400 text-sm">Failed to load appointments. Please try again.</p>
      </div>
    );
  }

  const scheduled = appointments?.filter((apt) => apt.status === "scheduled") ?? [];
  const past = appointments?.filter((apt) => apt.status !== "scheduled") ?? [];

  return (
    <>
      <div className="flex flex-col gap-8">
        <section>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Upcoming Appointments
          </h2>
          {scheduled.length > 0 ? (
            <div className="flex flex-col gap-4">
              {scheduled.map((apt) => (
                <AppointmentCard
                  key={apt.id}
                  appointment={apt}
                  onRebook={setSelectedAppointment}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No upcoming appointments.</p>
          )}
        </section>

        {past.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Past Appointments
            </h2>
            <div className="flex flex-col gap-4">
              {past.map((apt) => (
                <AppointmentCard
                  key={apt.id}
                  appointment={apt}
                  onRebook={setSelectedAppointment}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {selectedAppointment && (
        <RebookModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </>
  );
}