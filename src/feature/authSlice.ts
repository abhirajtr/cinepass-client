import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state of the authentication slice
interface AuthState {
    adminToken: string | null;
    userToken: string | null;
    theatreOwnerToken: string | null;
}

const initialState: AuthState = {
    adminToken: localStorage.getItem("adminToken"),
    userToken: localStorage.getItem("userToken"),
    theatreOwnerToken: localStorage.getItem("theatreOwnerToken"),
};

// Helper function for localStorage operations
const updateLocalStorage = (key: string, value: string | null) => {
    if (value === null) {
        localStorage.removeItem(key);
    } else {
        localStorage.setItem(key, value);
    }
};

// Create the auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state, action: PayloadAction<"admin" | "user" | "theatreOwner">) => {
            const role = action.payload;
            updateLocalStorage(`${role}Token`, null);
            state[`${role}Token`] = null;
        },
        setToken: (state, action: PayloadAction<{ role: "admin" | "user" | "theatreOwner"; token: string }>) => {
            const { role, token } = action.payload;
            state[`${role}Token`] = token;
            updateLocalStorage(`${role}Token`, token);
        },
    },
});

// Export the actions and reducer
export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
