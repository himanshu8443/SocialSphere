import { createSlice } from "@reduxjs/toolkit";

type ActivePost = {
  post: any;
};
export const activePost = createSlice({
  name: "activePost",
  initialState: { post: null } as ActivePost,

  reducers: {
    setActivePost: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const { setActivePost } = activePost.actions;
