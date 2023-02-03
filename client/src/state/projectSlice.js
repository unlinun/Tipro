import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: ["initiating", "in progress", "canceled", "finished"],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
});

export default projectSlice.reducer;
