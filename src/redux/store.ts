import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { userSlice } from "./slices/user";
import { activePost } from "./slices/ActivePost";
import { topLoadingBar } from "./slices/TopLoadingBar";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["email", "name", "auth", "profileImage", "id"],
};

const userPersistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const store = configureStore({
  reducer: {
    user: userPersistedReducer,
    activePost: activePost.reducer,
    topLoadingBar: topLoadingBar.reducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
