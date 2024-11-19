import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAdminSuccess, loginUserSuccess, loginTheaterOwnerSuccess, setAdminToken, logoutAdmin } from "./authSlice";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { backendUrl } from "../constants";
import { AppDispatch } from "@/store";
import adminApi from "@/axiosInstance/adminApi";

// Login thunk for regular user
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (loginData: { email: string, password: string }, { dispatch }) => {
        try {
            const response = await axios.post(backendUrl + `/user/login`, loginData, { withCredentials: true });
            toast.success(response.data?.message);
            dispatch(loginUserSuccess(response.data.accessToken));
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
            dispatch(loginAdminSuccess(response.data.accessToken));
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
            dispatch(loginTheaterOwnerSuccess(response.data.accessToken));
            console.log(response);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.");
            }
            console.log(error);
        }
    }
);

export const refershTokenAdminThunk = () => async (dispatch: AppDispatch) => {
    try {
        const response = await adminApi.post(`/refresh-token`, {}, { withCredentials: true });
        const { accessToken } = response.data;
        console.log(response.data);
        dispatch(setAdminToken({ accessToken }));
    } catch (error) {
        dispatch(logoutAdmin());
        window.location.href = '/admin/login';
        console.log(error);
    }
}
