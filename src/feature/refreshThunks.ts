import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../constants";
import { setToken } from "./authSlice";

export const refreshTheatreOwnerThunk = createAsyncThunk(
    'auth/refreshTheatreOwner',
    async (_, { dispatch }) => {
        try {
            const response = await axios.post(`${backendUrl}/theatreOwner/refresh-token`, {}, { withCredentials: true });
            dispatch(setToken(response.data.accessToken));
        } catch (error) {
            console.log('Failed to refresh token:', error);
            throw error;
        }
    }
)