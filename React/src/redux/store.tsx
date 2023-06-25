import { configureStore } from "@reduxjs/toolkit";
import { filterSlice } from "./slices/filter";
import { weatherSlice } from "./slices/weather";

export const store = configureStore({
    reducer: {
        weather: weatherSlice.reducer,
        filter: filterSlice.reducer
    }
})

export type AppDispatch = typeof store.dispatch