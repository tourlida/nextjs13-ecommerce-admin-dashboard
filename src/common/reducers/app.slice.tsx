import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Store } from "@prisma/client";

interface AppState{
    // Navigation states
    themeMode: 'dark' | 'light';
    IsStoreModalOpen:boolean;
    selectedStore: Store | null;
};

const initialState: AppState = {
    themeMode: 'light',
    IsStoreModalOpen:false,
    selectedStore:null
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
        selectStore: (state, action: PayloadAction<Store>) => {
            state.selectedStore= action.payload;
        },
    },
});

// -------------------------------------------------------------------------------------------------------
export const {
    toggleStoreModalOpen,
    toggleThemeMode,
    selectStore
} = appSlice.actions;
// -------------------------------------------------------------------------------------------------------
export default appSlice.reducer;