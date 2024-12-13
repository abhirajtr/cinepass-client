import axios from "axios";

const baseURL = 'http://localhost:3000';

const axiosInstance = axios.create({
    baseURL: baseURL
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;