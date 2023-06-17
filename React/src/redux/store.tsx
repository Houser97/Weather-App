import { configureStore } from "@reduxjs/toolkit";
import { weatherSlice } from "./slices/weather";

export const store = configureStore({
    reducer: {
        weather: weatherSlice.reducer
    }
})

export type AppDispatch = typeof store.dispatch