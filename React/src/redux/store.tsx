import { configureStore } from "@reduxjs/toolkit";
import { filterSlice } from "./slices/filter";
import { themeSlice } from "./slices/theme";
import { weatherSlice } from "./slices/weather";

export const store = configureStore({
    reducer: {
        weather: weatherSlice.reducer,
        filter: filterSlice.reducer,
        theme: themeSlice.reducer
    }
})

export type AppDispatch = typeof store.dispatch