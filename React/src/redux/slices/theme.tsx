import { createSlice } from "@reduxjs/toolkit";
import { themeRootState, themeTypes } from "../../TypeScript/themeTypes";

const initialState: themeTypes = {isDark: false}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        updateTheme: (state, {payload}) => {
            state.isDark = payload
        }
    }
})

export const {
    updateTheme
} = themeSlice.actions

export const themeSelector = (state: themeRootState) => state.theme

export default themeSlice.reducer