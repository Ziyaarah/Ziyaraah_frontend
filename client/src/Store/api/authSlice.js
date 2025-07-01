import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../BaseUrl";

axios.defaults.withCredentials = true;

// Async thunk for registering a user
export const registering = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/register`, userData);
            return response.data;
            
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for logging in a user
export const loggingIn = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/login`, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    user: null, 
    isauthenticated: false,
    loading: false,
    error: null,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(registering.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registering.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isauthenticated = true;
            })
            .addCase(registering.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loggingIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loggingIn.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isauthenticated = true;
            })
            .addCase(loggingIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});


export default authSlice.reducer;