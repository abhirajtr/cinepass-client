import { configureStore } from "@reduxjs/toolkit";
import authReducer from './feature/authSlice';


export const store = configureStore({
    reducer: {
        authReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const getAccessToken = (state: RootState) => state.authReducer.accessToken;