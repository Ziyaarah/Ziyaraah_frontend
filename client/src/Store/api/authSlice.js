import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiFetch } from "./apiFetch.js";

axios.defaults.withCredentials = true;

// Async thunk for registering a user
export const registering = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });
      return data;
    } catch (error) {
      console.error("❌ Register Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for logging in a user
export const loginAuth = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(userData),
      });
      console.log("🔁 login API returned:", data); // ← ADD THIS
      return data;
    } catch (error) {
      console.error("❌ Login Error:", error);
      return rejectWithValue(error.message);
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
            .addCase(loginAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAuth.fulfilled, (state, action) => {
               console.log("✅ login fulfilled payload:", action.payload);
               state.loading = false;
               state.user = action.payload.user;
               state.isauthenticated = true;
            })
            .addCase(loginAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});


export default authSlice.reducer;