import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Change state type to store the district name as a string
interface LocationState {
    district: string | null;
}

const initialState: LocationState = {
    district: localStorage.getItem("location") || null, // Load the location from localStorage if available
};

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<string>) => {
            state.district = action.payload;
            localStorage.setItem("location", action.payload); // Save the location to localStorage
        },
    },
});

// Export the action for setting the location
export const { setLocation } = locationSlice.actions;

// Export the reducer to add it to the store
export default locationSlice.reducer;
