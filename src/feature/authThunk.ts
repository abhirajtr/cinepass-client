import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { backendUrl } from "../constants";
import { setToken } from "./authSlice";

// Login thunk for regular user
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (loginData: { email: string, password: string }, { dispatch }) => {
        try {
            const response = await axios.post(backendUrl + `/user/login`, loginData, { withCredentials: true });
            toast.success(response.data?.message);
            dispatch(setToken({ role: "user", token: response.data.accessToken }));
            console.log(response);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.");
            }
            console.log(error);
        }
    }
);

// Login thunk for admin
export const loginAdmin = createAsyncThunk(
    'auth/loginAdmin',
    async (loginData: { email: string, password: string }, { dispatch }) => {
        try {
            const response = await axios.post(backendUrl + `/admin/login`, loginData, { withCredentials: true });
            toast.success(response.data?.message);
            dispatch(setToken({ role: "admin", token: response.data.accessToken }));
            console.log(response);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.");
            }
            console.log(error);
        }
    }
);

// Login thunk for theatre owner
export const loginTheatreOwner = createAsyncThunk(
    'auth/loginTheatre',
    async (loginData: { email: string, password: string }, { dispatch }) => {
        try {
            const response = await axios.post(backendUrl + `/theatreOwner/login`, loginData, { withCredentials: true });
            toast.success(response.data?.message);
            dispatch(setToken({ role: "theatreOwner", token: response.data.accessToken }));
            console.log(response);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.");
            }
            console.log(error);
        }
    }
);
