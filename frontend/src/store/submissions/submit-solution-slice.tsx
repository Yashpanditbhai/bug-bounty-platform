import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axiosInstance";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import type { SubmitSolutionPayload, SubmitSolutionState } from "@/types/submissions/submissions-type";

/* ================= INITIAL STATE ================= */

const initialState: SubmitSolutionState = {
  isLoading: false,
  error: null,
  isSuccess: false,
  isRun: uuidv4(),
};

/* ================= THUNK ================= */

export const submitSolution = createAsyncThunk<void, SubmitSolutionPayload, { rejectValue: string }>(
  "submission/submit",
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("bugCode", payload.bugCode);
      formData.append("description", payload.description);

      payload.attachments?.forEach((file) => {
        formData.append("attachments", file);
      });

      await axiosInstance.post("/submissions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Solution submitted successfully");
    } catch (e: any) {
      const message = e.response?.data?.message || "Failed to submit solution";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

/* ================= SLICE ================= */

const submitSolutionSlice = createSlice({
  name: "submitSolution",
  initialState,
  reducers: {
    resetSubmitSolutionState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
      state.isRun = uuidv4();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSolution.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitSolution.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isRun = uuidv4();
      })
      .addCase(submitSolution.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to submit solution";
      });
  },
});

export const { resetSubmitSolutionState } = submitSolutionSlice.actions;
export const submitSolutionReducer = submitSolutionSlice.reducer;
