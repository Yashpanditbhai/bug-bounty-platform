import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axiosInstance";
import type { Bug } from "@/types/bugs/bugs-types";

interface BugsState {
  isLoading: boolean;
  bugs: Bug[];
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: BugsState = {
  isLoading: false,
  bugs: [],
  error: null,
};

/* ================= THUNK ================= */

export const getAllBugs = createAsyncThunk<Bug[], void, { rejectValue: string }>(
  "bugs/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/bugs");
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch bugs");
    }
  },
);

/* ================= SLICE ================= */

const getAllBugsSlice = createSlice({
  name: "getAllBugs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBugs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllBugs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bugs = action.payload;
      })
      .addCase(getAllBugs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const getAllBugsReducer = getAllBugsSlice.reducer;
