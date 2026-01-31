import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  showAuthModal: boolean;
  authMode: "login" | "register";
}

const initialState: UIState = {
  showAuthModal: false,
  authMode: "login",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.showAuthModal = true;
      state.authMode = "login";
    },
    openRegisterModal: (state) => {
      state.showAuthModal = true;
      state.authMode = "register";
    },
    closeAuthModal: (state) => {
      state.showAuthModal = false;
    },
  },
});

export const { openLoginModal, openRegisterModal, closeAuthModal } = uiSlice.actions;

export const uiReducer = uiSlice.reducer;
