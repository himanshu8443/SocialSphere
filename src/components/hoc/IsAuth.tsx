"use client";
import { useAppSelector } from "@/lib/hook";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const auth = useAppSelector((state) => state.user.auth);

    useLayoutEffect(() => {
      if (auth) {
        console.log("redirecting", auth);
        return redirect("/");
      }
    }, [auth]);

    if (auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
