import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axiosInstance";
import type { GetSubmissionsState, Submission } from "@/types/submissions/submissions-type";

/* ================= INITIAL STATE ================= */

const initialState: GetSubmissionsState = {
  submissions: [],
  isLoading: false,
  error: null,
};

/* ================= THUNK ================= */

export const getSubmissionsByBug = createAsyncThunk<Submission[], string, { rejectValue: string }>(
  "submission/getByBug",
  async (bugCode, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/submissions/bug/${bugCode}`);
      return res.data.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Failed to fetch submissions");
    }
  },
);

/* ================= SLICE ================= */

const getSubmissionsByBugSlice = createSlice({
  name: "getSubmissionsByBug",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubmissionsByBug.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubmissionsByBug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.submissions = action.payload;
      })
      .addCase(getSubmissionsByBug.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch submissions";
      });
  },
});

export const getSubmissionsByBugReducer = getSubmissionsByBugSlice.reducer;
