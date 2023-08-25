import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AppState{
    // Navigation states
    themeMode: 'dark' | 'light';
    IsModalOpen:boolean;
};

const initialState: AppState = {
    themeMode: 'light',
    IsModalOpen:false
};

// -------------------------------------------------------------------------------------------------------
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleModalOpen: (state:AppState, action: PayloadAction<void>) => {
            state.IsModalOpen = ! state.IsModalOpen;
        },
        toggleThemeMode: (state, action: PayloadAction<void>) => {
            console.log('toggleThemeMode->',state.themeMode)
            state.themeMode= state.themeMode==='light' ? 'dark' : 'light';
        },
    },
});

// -------------------------------------------------------------------------------------------------------
export const {
    toggleModalOpen,
    toggleThemeMode,
} = appSlice.actions;
// -------------------------------------------------------------------------------------------------------
export default appSlice.reducer;