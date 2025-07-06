import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup, getCurrentUser } from "./auth";


// Async thunk for registering a user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const data = await signup(name, email, password);
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
       console.error("❌ Register Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for logging in a user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
       console.error("❌ Login Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Get current logged-in user
export const fetchCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
   async (_, { rejectWithValue }) => {
    try {
      const data = await getCurrentUser();
      return data;
    } catch (error) {
       console.error("❌ user Error:", error);
      return rejectWithValue(error.message);
    }
  }
);


// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isauthenticated: false,
    loading: false,
    error: null,
    isUserChecked: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isauthenticated = false;
      state.loading = false;
      state.error = null;
      state.isUserChecked = true;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isauthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isauthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isauthenticated = true;
        state.isUserChecked = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isauthenticated = false;
        state.error = action.payload;
        state.isUserChecked = true;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;