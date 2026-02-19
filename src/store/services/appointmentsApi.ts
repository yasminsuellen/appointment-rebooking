import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Appointment, TimeSlot } from "@/lib/mockData";

export const appointmentsApi = createApi({
  reducerPath: "appointmentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Appointments"],
  endpoints: (builder) => ({
    getAppointments: builder.query<Appointment[], string>({
      query: (patientId) => `/appointments?patientId=${patientId}`,
      providesTags: ["Appointments"],
    }),
    getAvailableSlots: builder.query<TimeSlot[], string>({
      query: (specialty) => `/slots?specialty=${encodeURIComponent(specialty)}`,
    }),
    rebookAppointment: builder.mutation({
  query: (body: { appointmentId: string; slotId: string }) => ({
    url: "/appointments/rebook",
    method: "POST",
    body,
  }),
  invalidatesTags: ["Appointments"],
}),

  }),
});

export const {
  useGetAppointmentsQuery,
  useGetAvailableSlotsQuery,
  useRebookAppointmentMutation,
} = appointmentsApi;