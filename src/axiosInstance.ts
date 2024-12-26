import axios from "axios";
import { store } from "./store";

const baseURL = 'http://localhost:3000';

const axiosInstance = axios.create({
    baseURL: baseURL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const accessToken = state.authReducer?.userToken;
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
