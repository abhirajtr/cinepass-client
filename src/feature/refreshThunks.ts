import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "@/constants";
import { setTheatreOwnerToken } from "./authSlice";

export const refreshTheatreOwnerThunk = createAsyncThunk(
    'auth/refreshTheatreOwner',
    async (_, { dispatch }) => {
        try {
            const response = await axios.post(`${backendUrl}/theatreOwner/refresh-token`, {}, { withCredentials: true });
            dispatch(setTheatreOwnerToken(response.data.accessToken));
        } catch (error) {
            console.log('Failed to refresh token:', error);
            throw error;
        }
    }
)