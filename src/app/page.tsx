"use client";
import { useState } from "react";
import { login, signUp, logout } from "@/app/api/auth";
import { getUserDetails } from "@/app/api/user";
import DropUpload from "@/components/DropUpload";
import { UserIncludes } from "@/app/api/user";
import { setEmail, setName } from "@/redux/slices/user";
import { useAppDispatch, useAppSelector } from "@/hook";

export default function Home() {
  const [user, setUser] = useState() as any;
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.user);

  return (
    <div className="flex flex-col gap-3">
      <h1>Home</h1>
      <button
        onClick={async () => {
          const user = await login({
            email: "abc@g.gmail.com",
            password: "123",
          });
          setUser(user);
          console.log("user", user);
        }}
      >
        login
      </button>
      <button
        onClick={async () => {
          const user = await signUp({
            email: "abc@g.gmail.com",
            password: "123",
            name: "bob",
          });
          setUser(user);
          console.log("user", user);
        }}
      >
        sign up
      </button>
      <button
        onClick={async () => {
          const user = await logout();
          setUser(user);
          console.log("user", user);
        }}
      >
        logout
      </button>
      <button
        onClick={async () => {
          const user = await getUserDetails(
            UserIncludes.posts,
            UserIncludes.comments
          );
          setUser(user);
          console.log("user", user);
        }}
      >
        me
      </button>

      <DropUpload />
      <div className="flex flex-col gap-3">
        <h1>Redux</h1>
        <button
          onClick={() => {
            dispatch(setEmail("hjk"));
          }}
        >
          set email
        </button>
        <p>email {state.email}</p>
      </div>
    </div>
  );
}
