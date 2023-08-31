import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AppState{
    // Navigation states
    themeMode: 'dark' | 'light';
    IsStoreModalOpen:boolean;
};

const initialState: AppState = {
    themeMode: 'light',
    IsStoreModalOpen:false
};

// -------------------------------------------------------------------------------------------------------
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleStoreModalOpen: (state:AppState, action: PayloadAction<boolean>) => {
            state.IsStoreModalOpen = !state.IsStoreModalOpen;
        },
        toggleThemeMode: (state, action: PayloadAction<void>) => {
            state.themeMode= state.themeMode==='light' ? 'dark' : 'light';
        },
    },
});

// -------------------------------------------------------------------------------------------------------
export const {
    toggleStoreModalOpen,
    toggleThemeMode,
} = appSlice.actions;
// -------------------------------------------------------------------------------------------------------
export default appSlice.reducer;