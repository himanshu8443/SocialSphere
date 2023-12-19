import { createSlice } from "@reduxjs/toolkit";

type TopLoadingBar = {
  progress: number;
};

export const topLoadingBar = createSlice({
  name: "topLoadingBar",
  initialState: { progress: 0 } as TopLoadingBar,

  reducers: {
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
});

export const { setProgress } = topLoadingBar.actions;
