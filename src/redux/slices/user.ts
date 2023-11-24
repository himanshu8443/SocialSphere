import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface UserState {
  auth: boolean;
  id: string;
  name: string;
  email: string;
  profileImage: string;
}

// Define the initial state using that type
const initialState: UserState = {
  auth: false,
  id: "",
  name: "",
  email: "",
  profileImage: "",
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
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.auth = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profileImage = action.payload.profileImage;
    },
    setLogout: (state) => {
      state.id = "";
      state.auth = false;
      state.name = "";
      state.email = "";
    },
  },
});

export const { setName, setEmail, setAuth, setLogout, setUser } =
  userSlice.actions;
