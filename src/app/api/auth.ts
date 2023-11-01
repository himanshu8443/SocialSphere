import { toast } from "react-toastify";
import { trpc } from "../../trpc/trpc";

export async function signUp({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const result = await trpc.auth.createUser.mutate({
      name,
      email,
      password,
    });
    return {
      data: result,
    };
  } catch (error: any) {
    console.log("error message", error?.data?.message);
    console.log("error", error);
    return {
      success: false,
      message: error?.data?.message,
    };
  }
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const result = await trpc.auth.login.mutate({
      email,
      password,
    });
    console.log("result", result);
    toast.success("Successfully logged in", { theme: "dark", autoClose: 1000 });
    return {
      data: result,
    };
  } catch (error: any) {
    console.log("error message", error?.data?.message);
    console.log("error", error);
    toast.error(error?.data?.message, {
      theme: "dark",
    });
    return {
      success: false,
      message: error?.data?.message,
    };
  }
}

export async function logout() {
  try {
    const result = await trpc.auth.logout.mutate();
    console.log("result", result);
    return {
      success: true,
      message: "Successfully logged out",
    };
  } catch (error: any) {
    console.log("error message", error?.data?.message);
    console.log("error", error);
    return {
      success: false,
      message: error?.data?.message,
    };
  }
}
