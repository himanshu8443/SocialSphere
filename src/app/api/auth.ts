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
    toast.success(result.message);
    return result;
  } catch (error: any) {
    toast.error(error?.data?.message || "Somthing went wrong");
    // console.log("error message", error?.data?.message);
    // console.log("error", error);
    return error;
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
    toast.success(result.message);
    return result;
  } catch (error: any) {
    // console.log("error message", error?.data?.message);
    // console.log("error", error);

    toast.error(error?.data?.message || "Somthing went wrong");
    return error;
  }
}

export async function logout() {
  try {
    const result = await trpc.auth.logout.mutate();
    toast.success(result.message);
    return result;
  } catch (error: any) {
    return error?.data?.code;
  }
}

export async function isLoggedIn() {
  try {
    const result = await trpc.auth.isLoggedIn.query();
    return result;
  } catch (error: any) {
    // console.log("error message", error?.data?.message);
    // console.log("error", error);
    return error;
  }
}
