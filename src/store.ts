import { configureStore } from "@reduxjs/toolkit";
import authReducer from './feature/authSlice';
import locationReducer from './feature/locationSlice';


export const store = configureStore({
    reducer: {
        authReducer,
        location: locationReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const getAccessToken = (state: RootState) => state.authReducer.accessToken;