import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/authSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
