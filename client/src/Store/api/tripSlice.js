// tripSlice.js – Redux Toolkit slice for trip management
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../api/auth/apiFetch"; // ← isticmaal apiFetch

// GET all trips
export const fetchTrips = createAsyncThunk("trips/fetchAll", async () => {
  const response = await apiFetch("/api/trips");
  return response;
});

// GET one trip by ID
export const fetchTripById = createAsyncThunk("trips/fetchOne", async (id) => {
  const response = await apiFetch(`/api/trips/${id}`);
  return response;
});

// CREATE trip
export const createTrip = createAsyncThunk("trips/create", async (data) => {
  const response = await apiFetch("/api/trips", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
});

// DELETE trip
export const deleteTrip = createAsyncThunk("trips/delete", async (id) => {
  await apiFetch(`/api/trips/${id}`, {
    method: "DELETE",
  });
  return id;
});

const tripSlice = createSlice({
  name: "trips",
  initialState: {
    items: [],
    selectedTrip: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTripById.fulfilled, (state, action) => {
        state.selectedTrip = action.payload;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.items = state.items.filter((trip) => trip.id !== action.payload);
      });
  },
});

export default tripSlice.reducer;
