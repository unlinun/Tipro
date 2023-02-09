import { createSlice } from "@reduxjs/toolkit";

let defaultMode = window.matchMedia(`(prefers-color-scheme: light)`).matches
  ? "light"
  : "dark";

const initialState = {
  user: null,
  token: null,
  mode: defaultMode,
  creating: false,
  companyID: null,
  staffs: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.companyID = action.payload.companyID;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.companyID = null;
      state.staffs = null;
    },
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setCreatingProject: (state) => {
      state.creating = !state.creating;
    },
    setStaffs: (state, action) => {
      state.staffs = action.payload.staffs;
    },
  },
});

export const { setLogin, setLogout, setMode, setCreatingProject, setStaffs } =
  authSlice.actions;
export default authSlice.reducer;
