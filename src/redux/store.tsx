import { configureStore } from "@reduxjs/toolkit";
import appReducer from '../common/reducers/app.slice';

export const store = configureStore({
  reducer: {
    app: appReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
