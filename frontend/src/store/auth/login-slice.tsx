import axiosInstance from "@/services/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { setToken } from "./auth-slice";
import { fetchLoggedInUserDetail } from "../user/get-loggedin-user-slice";

/* ================= TYPES ================= */

export interface LoginPayload {
  email: string;
  password: string;
}

interface LoginState {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  isRun: string;
}

/* ================= INITIAL STATE ================= */

const initialState: LoginState = {
  isLoading: false,
  error: null,
  isSuccess: false,
  isRun: uuidv4(),
};

/* ================= THUNK ================= */

export const loginUser = createAsyncThunk<void, LoginPayload, { rejectValue: string }>(
  "auth/login",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post("/auth/login", payload);

      const token = res.data.data.token;

      dispatch(setToken(token));

      toast.success("Logged in successfully");
    } catch (e: any) {
      const message = e.response?.data?.message || "Login failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

/* ================= SLICE ================= */

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetLoginState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
      state.isRun = uuidv4();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isRun = uuidv4();
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { resetLoginState } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
