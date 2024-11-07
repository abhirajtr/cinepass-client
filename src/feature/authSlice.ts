import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// Define the structure of the JWT payload
interface JwtPayload {
    role: string;
    exp: number;  // You can add more fields as needed
}

// Utility function to get role from the JWT token
export const getRoleFromToken = (token: string): string | null => {
    try {
        const decodedToken: JwtPayload = jwtDecode(token);
        console.log(decodedToken);
        return decodedToken.role;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

// Utility function to check if the token is expired
const isTokenExpired = (token: string): boolean => {
    try {
        const decodedToken: JwtPayload = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    } catch (error) {
        console.error("Error decoding token for expiration check:", error);
        return true;
    }
};

// Define the initial state of the authentication slice
interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    role: string | null;
}

// Retrieve accessToken from localStorage and validate expiration
const accessToken = localStorage.getItem('accessToken');
const initialState: AuthState = {
    accessToken: accessToken,
    isAuthenticated: accessToken ? !isTokenExpired(accessToken) : false,
    role: accessToken ? getRoleFromToken(accessToken) : null,
};

// Create the auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<string>) => {
            const token = action.payload;
            state.accessToken = token;
            state.isAuthenticated = !isTokenExpired(token);  // Ensure the token is valid
            state.role = getRoleFromToken(token);
            localStorage.setItem('accessToken', token);
        },
        logout: (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
            state.role = null;
            localStorage.removeItem('accessToken');
        },
    },
});

// Export the actions and reducer
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
