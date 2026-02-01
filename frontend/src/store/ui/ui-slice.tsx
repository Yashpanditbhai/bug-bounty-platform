import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  showAuthModal: boolean;
  authMode: "login" | "register";

  showPostBugModal: boolean;
  // Submit Solution
  showSubmitSolutionModal: boolean;
  activeBugCode: string | null;

  showRewardModal: boolean;
  activeSubmissionCode: string | null;
}

const initialState: UIState = {
  showAuthModal: false,
  authMode: "login",
  showPostBugModal: false,

  showSubmitSolutionModal: false,
  activeBugCode: null,

  showRewardModal: false,
  activeSubmissionCode: null,
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

    /* ================= POST BUG MODAL ================= */

    openPostBugModal: (state) => {
      state.showPostBugModal = true;
    },

    closePostBugModal: (state) => {
      state.showPostBugModal = false;
    },

    /* ================= SUBMIT SOLUTION MODAL ================= */

    openSubmitSolutionModal: (state, action: PayloadAction<string>) => {
      state.showSubmitSolutionModal = true;
      state.activeBugCode = action.payload; // BUG-XXXX
    },

    closeSubmitSolutionModal: (state) => {
      state.showSubmitSolutionModal = false;
      state.activeBugCode = null;
    },

    openRewardModal: (state, action: PayloadAction<string>) => {
      state.showRewardModal = true;
      state.activeSubmissionCode = action.payload;
    },

    closeRewardModal: (state) => {
      state.showRewardModal = false;
      state.activeSubmissionCode = null;
    },
  },
});

export const {
  openLoginModal,
  openRegisterModal,
  closeAuthModal,
  openPostBugModal,
  closePostBugModal,
  openSubmitSolutionModal,
  closeSubmitSolutionModal,
  openRewardModal,
  closeRewardModal,
} = uiSlice.actions;

export const uiReducer = uiSlice.reducer;
