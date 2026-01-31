import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

/* ================= TYPES ================= */

export interface CreateBugPayload {
  title: string;
  description: string;
  bounty: number;
}

interface CreateBugState {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  isRun: string;
}

/* ================= INITIAL STATE ================= */

const initialState: CreateBugState = {
  isLoading: false,
  error: null,
  isSuccess: false,
  isRun: uuidv4(),
};

/* ================= THUNK ================= */

export const createBug = createAsyncThunk<void, FormData, { rejectValue: string }>(
  "bug/create",
  async (payload, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/bugs", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Bug created successfully");
    } catch (e: any) {
      const message = e.response?.data?.message || "Failed to create bug";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

/* ================= SLICE ================= */

const createBugSlice = createSlice({
  name: "createBug",
  initialState,
  reducers: {
    resetCreateBugState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
      state.isRun = uuidv4();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBug.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(createBug.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isRun = uuidv4();
      })
      .addCase(createBug.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to create bug";
      });
  },
});

export const { resetCreateBugState } = createBugSlice.actions;
export const createBugReducer = createBugSlice.reducer;
