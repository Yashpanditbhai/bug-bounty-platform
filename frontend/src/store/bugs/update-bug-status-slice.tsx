import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axiosInstance";

/* ================= TYPES ================= */

export type BugStatus = "Open" | "In Review" | "Closed";

interface UpdateBugStatusPayload {
  bugCode: string;
  status: BugStatus;
}

interface UpdateBugStatusState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: UpdateBugStatusState = {
  isLoading: false,
  isSuccess: false,
  error: null,
};

/* ================= THUNK ================= */

export const updateBugStatus = createAsyncThunk<
  any, // backend returns updated bug
  UpdateBugStatusPayload,
  { rejectValue: string }
>("bugs/updateStatus", async ({ bugCode, status }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.patch(`/bugs/${bugCode}/status`, { status });

    return res.data.data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data?.message || "Failed to update bug status");
  }
});

/* ================= SLICE ================= */

const updateBugStatusSlice = createSlice({
  name: "updateBugStatus",
  initialState,
  reducers: {
    resetUpdateBugStatus: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateBugStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBugStatus.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateBugStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetUpdateBugStatus } = updateBugStatusSlice.actions;

export const updateBugStatusReducer = updateBugStatusSlice.reducer;
