import AppointmentList from "@/components/AppointmentList";

export default function AppointmentsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-500 mt-2">
            Manage and rebook your medical appointments.
          </p>
        </div>
        <AppointmentList />
      </div>
    </main>
  );
}