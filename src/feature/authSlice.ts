import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode} from "jwt-decode";

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
    adminToken: string | null;
    userToken: string | null;
    theaterOwnerToken: string | null;
    isAuthenticatedAdmin: boolean;
    isAuthenticatedUser: boolean;
    isAuthenticatedTheaterOwner: boolean;
    adminId: string | null;
    userId: string | null;
    theaterOwnerId: string | null;
}

// Helper function to get and validate tokens from localStorage
const getTokenData = (key: string): { token: string | null; isAuthenticated: boolean } => {
    const token = localStorage.getItem(key);
    return {
        token,
        isAuthenticated: token ? !isTokenExpired(token) : false,
    };
};

const initialState: AuthState = {
    ...getTokenData("adminToken"),
    adminToken: localStorage.getItem("adminToken"),
    userToken: localStorage.getItem("userToken"),
    theaterOwnerToken: localStorage.getItem("theaterOwnerToken"),
    isAuthenticatedAdmin: !!getTokenData("adminToken").isAuthenticated,
    isAuthenticatedUser: !!getTokenData("userToken").isAuthenticated,
    isAuthenticatedTheaterOwner: !!getTokenData("theaterOwnerToken").isAuthenticated,
    adminId: null,
    userId: null,
    theaterOwnerId: null,
};

// Create the auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginAdminSuccess: (state, action: PayloadAction<string>) => {
            const token = action.payload;
            const tokenData = getRoleAndUserIdFromToken(token);
            state.adminToken = token;
            state.isAuthenticatedAdmin = !isTokenExpired(token);
            state.adminId = tokenData ? tokenData.userId : null;
            localStorage.setItem("adminToken", token);
        },
        loginUserSuccess: (state, action: PayloadAction<string>) => {
            const token = action.payload;
            const tokenData = getRoleAndUserIdFromToken(token);
            state.userToken = token;
            state.isAuthenticatedUser = !isTokenExpired(token);
            state.userId = tokenData ? tokenData.userId : null;
            localStorage.setItem("userToken", token);
        },
        loginTheaterOwnerSuccess: (state, action: PayloadAction<string>) => {
            const token = action.payload;
            const tokenData = getRoleAndUserIdFromToken(token);
            state.theaterOwnerToken = token;
            state.isAuthenticatedTheaterOwner = !isTokenExpired(token);
            state.theaterOwnerId = tokenData ? tokenData.userId : null;
            localStorage.setItem("theaterOwnerToken", token);
        },
        logoutAdmin: (state) => {
            state.adminToken = null;
            state.isAuthenticatedAdmin = false;
            state.adminId = null;
            localStorage.removeItem("adminToken");
        },
        logoutUser: (state) => {
            state.userToken = null;
            state.isAuthenticatedUser = false;
            state.userId = null;
            localStorage.removeItem("userToken");
        },
        logoutTheaterOwner: (state) => {
            state.theaterOwnerToken = null;
            state.isAuthenticatedTheaterOwner = false;
            state.theaterOwnerId = null;
            localStorage.removeItem("theaterOwnerToken");
        },
    },
});

// Export the actions and reducer
export const { loginAdminSuccess, loginUserSuccess, loginTheaterOwnerSuccess, logoutAdmin, logoutUser, logoutTheaterOwner } = authSlice.actions;
export default authSlice.reducer;
