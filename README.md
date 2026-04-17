# Appointment Rebooking Feature
A Next.js application implementing an appointment rebooking feature for patients, built as a technical assessment. **[Click here to live demo.](appointment-rebooking.vercel.app)**

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.11-764ABC?style=flat-square&logo=redux&logoColor=white)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](SUA_URL_VERCEL_AQUI)

<div align="center">
  <img src="https://github.com/user-attachments/assets/f3a5904c-d4f0-4af1-872b-02c23ce52429" alt="Appointment Rebooking Demo" width="100%"/>
</div>

## Live Demo

Run locally following the instructions below.

## Features

- View all patient appointments separated by upcoming and past
- Rebook appointments scheduled more than 24 hours in the future
- Specialty-locked rebooking: patients can only rebook within the same medical specialty
- Automatic list refresh after rebooking using RTK Query cache invalidation
- Fully typed with TypeScript

## Tech Stack

- **Next.js 15** — React framework with App Router and built-in API routes
- **Redux Toolkit + RTK Query** — state management and data fetching with automatic cache invalidation
- **TypeScript** — static typing throughout the project
- **Tailwind CSS** — utility-first styling

## Architecture Decisions

### RTK Query for data fetching
RTK Query was used to manage all API calls. The `getAppointments` query uses `providesTags: ["Appointments"]`, and the `rebookAppointment` mutation uses `invalidatesTags: ["Appointments"]`. This means that after a successful rebooking, the appointments list is automatically refetched without any manual intervention.

### API Routes as backend
Next.js API Routes (`/api/appointments`, `/api/appointments/rebook`, `/api/slots`) simulate a real backend. All business logic validations are handled server-side, including the 24-hour rebooking restriction and specialty matching.

### Business rules enforced on both sides
- The `AppointmentCard` component hides the rebook button client-side for appointments within 24 hours
- The `/api/appointments/rebook` endpoint validates the same rule server-side, preventing any bypass attempts

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation
```bash
git clone https://github.com/yasminsuellen/appointment-rebooking.git
cd appointment-rebooking
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
src/
├── app/
│   ├── api/
│   │   ├── appointments/
│   │   │   ├── route.ts          # GET /api/appointments
│   │   │   └── rebook/
│   │   │       └── route.ts      # POST /api/appointments/rebook
│   │   └── slots/
│   │       └── route.ts          # GET /api/slots
│   ├── appointments/
│   │   └── page.tsx              # My Appointments page
│   └── page.tsx                  # Home page
├── components/
│   ├── AppointmentCard.tsx       # Single appointment card with rebook button
│   ├── AppointmentList.tsx       # Full appointments list with sections
│   └── RebookModal.tsx           # Rebooking flow modal
├── store/
│   ├── Provider.tsx              # Redux provider wrapper
│   ├── store.ts                  # Redux store configuration
│   └── services/
│       └── appointmentsApi.ts    # RTK Query API slice
└── lib/
    └── mockData.ts               # Mock data and TypeScript interfaces
```

## Rebooking Flow

1. Patient views their appointments list
2. Appointments scheduled more than 24 hours ahead show a **Rebook** button
3. Clicking **Rebook** opens a modal filtered to the same specialty
4. Patient selects a new available time slot
5. On confirmation, a POST request is sent via RTK Query mutation
6. The mutation invalidates the `Appointments` tag, triggering an automatic refetch
7. The list updates instantly with the new appointment data
