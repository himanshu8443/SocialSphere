import { createSlice } from "@reduxjs/toolkit";

type ModeState = {
  theme: "light" | "dark";
};

export const modeSlice = createSlice({
  name: "mode",
  initialState: {
    theme: "light",
  } as ModeState,
  reducers: {
    setMode: (state, action) => {
      state.theme = action.payload as "light" | "dark";
    },
  },
});
