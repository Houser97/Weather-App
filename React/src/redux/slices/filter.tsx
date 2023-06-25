import { createSlice } from "@reduxjs/toolkit";
import { filterRootState, filterTypes } from "../../TypeScript/filterTypes";

const initialState: filterTypes = {
    forecastOption: 'daily',
    metricOptions: 'metric'
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        updateForecastFilter: (state, {payload}) => {
            state.forecastOption = payload
        },
        updateMetricFilter: (state, {payload}) => {
            state.metricOptions = payload
        }
    }
})

export const {
    updateForecastFilter,
    updateMetricFilter
} = filterSlice.actions

export const filterSelector = (state: filterRootState) => state.filter

export default filterSlice.reducer