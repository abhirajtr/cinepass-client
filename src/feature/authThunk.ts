import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginSuccess } from "./authSlice";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { backendUrl } from "../constants";


export const login = createAsyncThunk(
    'auth/login',
    async (loginData: { email: string, password: string }, { dispatch }) => {
        try {
            const response = await axios.post(backendUrl + `/user/login`, loginData, { withCredentials: true });
            toast.success(response.data?.message);
            dispatch(loginSuccess(response.data.accessToken));
            console.log(response);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message);
            }
            console.log(error);
        }
    }
)