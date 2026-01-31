import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axiosInstance";

/* ================= TYPES ================= */

export interface BugDetails {
  bugCode: string;
  title: string;
  description: string;
  bounty: number;
  status: "Open" | "In Review" | "Closed";
  attachments: any;
  hasSubmitted?: any;
  createdBy: {
    userCode: string;
    name: string;
  };
}

interface BugDetailsState {
  isLoading: boolean;
  bug: BugDetails | null;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: BugDetailsState = {
  isLoading: false,
  bug: null,
  error: null,
};

/* ================= THUNK ================= */

export const getBugDetailsByCode = createAsyncThunk<BugDetails, string, { rejectValue: string }>(
  "bugs/getByCode",
  async (bugCode, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/bugs/${bugCode}`);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch bug details");
    }
  },
);

/* ================= SLICE ================= */

const bugDetailsSlice = createSlice({
  name: "bugDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBugDetailsByCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBugDetailsByCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bug = action.payload;
      })
      .addCase(getBugDetailsByCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const bugDetailsReducer = bugDetailsSlice.reducer;
