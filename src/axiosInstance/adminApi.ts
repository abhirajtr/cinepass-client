// theatreOwnerApi.js
import axios from 'axios';
import { store } from '../store';
import { backendUrl } from '../constants';

const adminApi = (() => {
    const instance = axios.create({
        baseURL: `${backendUrl}/admin`,
        withCredentials: true,
    });

    instance.interceptors.request.use((config) => {
        const state = store.getState();
        const accessToken = state.authReducer?.adminToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
            console.warn('Access token not found in Redux store. Requests will fail.');
            // Consider redirecting to login or other handling here.
        }
        return config;
    });

    return instance;
})();


export default adminApi;