import { createSlice } from "@reduxjs/toolkit";

let defaultMode = window.matchMedia(`(prefers-color-scheme: light)`).matches
  ? "light"
  : "dark";

const initialState = {
  user: null,
  token: null,
  mode: defaultMode,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setLogin, setMode } = authSlice.actions;
export default authSlice.reducer;
