// theatreOwnerApi.js
import axios from 'axios';
import { store } from '../store';
import { backendUrl } from '../constants';

const theatreOwnerApi = (() => {
    const instance = axios.create({
        baseURL: `${backendUrl}/theatreOwner`,
        withCredentials: true,
    });

    instance.interceptors.request.use((config) => {
        const state = store.getState();
        const accessToken = state.authReducer?.accessToken;

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


export default theatreOwnerApi;