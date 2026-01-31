import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

/* ================= TYPES ================= */

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface RegisterState {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  isRun: string;
}

/* ================= INITIAL STATE ================= */

const initialState: RegisterState = {
  isLoading: false,
  error: null,
  isSuccess: false,
  isRun: uuidv4(),
};

/* ================= THUNK ================= */

export const registerUser = createAsyncThunk<
  void,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (payload, { rejectWithValue }) => {
  try {
    await axiosInstance.post("/auth/register", payload);
    toast.success("Registration successful");
  } catch (e: any) {
    const message = e.response?.data?.message || "Registration failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});

/* ================= SLICE ================= */

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetRegisterState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
      state.isRun = uuidv4();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isRun = uuidv4();
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;
export const registerReducer = registerSlice.reducer;
