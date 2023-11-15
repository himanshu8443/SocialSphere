"use client";

import { useEffect } from "react";
import { isLoggedIn } from "@/app/api/auth";
import { useAppDispatch } from "@/lib/hook";
import { setLogout } from "@/redux/slices/user";

const AutoLogout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function checkIfLoggedIn() {
      const res = await isLoggedIn();
      if (res?.data?.error?.code === "UNAUTHORIZED") {
        console.log("not logged in");
        dispatch(setLogout());
      }
    }
    checkIfLoggedIn();
  }, [dispatch]);
  return <></>;
};

export default AutoLogout;
