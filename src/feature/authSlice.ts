import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// Define the structure of the JWT payload
interface JwtPayload {
    role: string;
    userId: string;
    exp: number;
}

// Utility function to decode and extract role and userId from JWT token
export const getRoleAndUserIdFromToken = (token: string): { role: string; userId: string } | null => {
    try {
        const decodedToken: JwtPayload = jwtDecode(token);
        const { role, userId } = decodedToken;
        return { role, userId };
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

// Utility function to check if the token is expired
const isTokenExpired = (token: string): boolean => {
    try {
        const decodedToken: JwtPayload = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
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
    userId: string | null;
}

// Retrieve accessToken from localStorage and validate expiration and payload
const accessToken = localStorage.getItem("accessToken");
const tokenData = accessToken ? getRoleAndUserIdFromToken(accessToken) : null;

const initialState: AuthState = {
    accessToken,
    isAuthenticated: accessToken ? !isTokenExpired(accessToken) : false,
    role: tokenData ? tokenData.role : null,
    userId: tokenData ? tokenData.userId : null,
};

// Create the auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<string>) => {
            const token = action.payload;
            const tokenData = getRoleAndUserIdFromToken(token);
            state.accessToken = token;
            state.isAuthenticated = !isTokenExpired(token);
            state.role = tokenData ? tokenData.role : null;
            state.userId = tokenData ? tokenData.userId : null;
            localStorage.setItem("accessToken", token);
        },
        logout: (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
            state.role = null;
            state.userId = null;
            localStorage.removeItem("accessToken");
        },
    },
});

// Export the actions and reducer
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
