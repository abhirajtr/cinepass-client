import axios from 'axios';
import { store } from '../store';
import { backendUrl } from '../constants';
import { logout, setToken } from '../feature/authSlice';

const adminApi = (() => {
    const instance = axios.create({
        baseURL: `${backendUrl}/admin`,
        withCredentials: true,
    });

    // Request interceptor: Add Authorization header
    instance.interceptors.request.use(
        (config) => {
            const state = store.getState();
            const accessToken = state.authReducer?.adminToken;

            if (accessToken) {
                console.log('Request Interceptor: Adding Authorization header', accessToken);
                config.headers.Authorization = `Bearer ${accessToken}`;
            } else {
                console.warn('Request Interceptor: Access token not found in Redux store.');
            }

            console.log('Request Config:', config); // Log full request config for debugging
            return config;
        },
        (error) => {
            console.error('Request Interceptor Error:', error);
            return Promise.reject(error);
        }
    );

    // Response interceptor: Handle token expiration
    instance.interceptors.response.use(
        (response) => {
            console.log('Response Interceptor: Successful response', response);
            return response; // Pass through successful responses
        },
        async (error) => {
            console.error('Response Interceptor: Error response', error);

            const originalRequest = error.config;
            console.log('Original Request:', originalRequest);

            if (error.response?.status === 401 && !originalRequest._retry) {
                console.warn('Response Interceptor: 401 detected, attempting token refresh...');
                originalRequest._retry = true; // Mark request as retried

                try {
                    // Send refresh token request
                    console.log('Sending refresh token request...');
                    const refreshResponse = await axios.post(
                        `${backendUrl}/admin/refresh-token`,
                        {},
                        { withCredentials: true }
                    );
                    console.log('Refresh Response:', refreshResponse);

                    const newAccessToken = refreshResponse.data.accessToken;
                    console.log('New Access Token:', newAccessToken);

                    // Update Redux store with new token
                    store.dispatch(setToken({ role: 'admin', token: newAccessToken }));
                    console.log('Redux store updated with new token.');

                    // Update Authorization header
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    console.log('Retrying original request with new token.');

                    // Retry the original request
                    return instance(originalRequest);
                } catch (refreshError) {
                    console.error('Failed to refresh access token:', refreshError);

                    // Logout admin if refresh fails
                    store.dispatch(logout('admin'));
                    console.log('User logged out due to failed token refresh.');
                }
            } else {
                console.warn('Response Interceptor: Non-401 or unrecoverable error.');
            }

            return Promise.reject(error); // Reject if error is not recoverable
        }
    );

    return instance;
})();

export default adminApi;
