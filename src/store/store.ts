import { configureStore } from "@reduxjs/toolkit";
import { appointmentsApi } from "./services/appointmentsApi";

export const store = configureStore({
  reducer: {
    [appointmentsApi.reducerPath]: appointmentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appointmentsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;