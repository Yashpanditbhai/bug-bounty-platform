import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axiosInstance";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import type { ApproveSubmissionState } from "@/types/submissions/submissions-type";

/* ================= INITIAL STATE ================= */

const initialState: ApproveSubmissionState = {
  isLoading: false,
  error: null,
  isSuccess: false,
  isRun: uuidv4(),
};

/* ================= THUNK ================= */

export const approveSubmission = createAsyncThunk<void, string, { rejectValue: string }>(
  "submission/approve",
  async (submissionCode, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`/submissions/approve/${submissionCode}`);
      toast.success("Submission approved");
    } catch (e: any) {
      const message = e.response?.data?.message || "Approval failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

/* ================= SLICE ================= */

const approveSubmissionSlice = createSlice({
  name: "approveSubmission",
  initialState,
  reducers: {
    resetApproveSubmissionState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
      state.isRun = uuidv4();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(approveSubmission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveSubmission.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isRun = uuidv4();
      })
      .addCase(approveSubmission.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Approval failed";
      });
  },
});

export const { resetApproveSubmissionState } = approveSubmissionSlice.actions;
export const approveSubmissionReducer = approveSubmissionSlice.reducer;
