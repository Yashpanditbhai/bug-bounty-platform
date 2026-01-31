import axiosInstance from "@/services/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

/* ================= TYPES ================= */

export interface LoggedInUser {
  userCode: string;
  name: string;
  email: string;
  totalEarnings: number;
}

interface GetLoggedInUserState {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  isRun: string;
  user: LoggedInUser | null;
}

/* ================= INITIAL STATE ================= */

const initialState: GetLoggedInUserState = {
  isLoading: false,
  error: null,
  isSuccess: false,
  isRun: uuidv4(),
  user: null,
};

/* ================= THUNK ================= */

export const fetchLoggedInUserDetail = createAsyncThunk<LoggedInUser, void, { rejectValue: string }>(
  "user/getLoggedInUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/users/me");
      return res.data.data;
    } catch (e: any) {
      const message = e.response?.data?.message || "Failed to fetch user";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

/* ================= SLICE ================= */

const getLoggedInUserSlice = createSlice({
  name: "getLoggedInUser",
  initialState,
  reducers: {
    resetGetLoggedInUserState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
      state.isRun = uuidv4();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLoggedInUserDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSuccess = true;
        state.isRun = uuidv4();
      })
      .addCase(fetchLoggedInUserDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch user";
      });
  },
});

export const { resetGetLoggedInUserState } = getLoggedInUserSlice.actions;
export const getLoggedInUserReducer = getLoggedInUserSlice.reducer;
