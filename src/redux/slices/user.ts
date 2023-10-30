import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserState {
  name: string;
  email: string;
}

// Define the initial state using that type
const initialState: UserState = {
  name: "",
  email: "nmn",
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setName, setEmail } = userSlice.actions;
