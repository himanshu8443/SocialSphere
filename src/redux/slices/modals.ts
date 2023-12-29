import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  followingModal: boolean;
  followersModal: boolean;
} = {
  followingModal: false,
  followersModal: false,
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setFollowingModal(state, action) {
      state.followingModal = action.payload;
    },
    setFollowersModal(state, action) {
      state.followersModal = action.payload;
    },
  },
});

export const { setFollowingModal, setFollowersModal } = modalsSlice.actions;
