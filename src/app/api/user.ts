import { toast } from "react-toastify";
import { trpc } from "../../trpc/trpc";

export type UserIncludes =
  | "posts"
  | "comments"
  | "likedPosts"
  | "savedPosts"
  | "followers"
  | "following";

export async function getUserDetails(...args: UserIncludes[]) {
  try {
    const result = await trpc.user.getUserDetails.query(args);
    return result;
  } catch (error: any) {
    console.log("error message", error?.data?.message);
    console.log("error", error);
    return error;
  }
}

export async function getUserDetailsById(id: string) {
  try {
    const result = await trpc.user.getUserDetailsById.query(id);
    return result;
  } catch (error: any) {
    console.log("error message", error?.data?.message);
    console.log("error", error);
    return error;
  }
}

export async function updateUserDetails({
  name,
  about,
  location,
}: {
  name?: string;
  about?: string;
  location?: string;
}) {
  try {
    const result = await trpc.user.updateUserDetails.mutate({
      name,
      about,
      location,
    });
    toast.success("Profile updated successfully");
    return result;
  } catch (error: any) {
    console.log("error message", error?.data?.message);
    console.log("error", error);
    return error;
  }
}

export async function searchUser(query: string) {
  try {
    const result = await trpc.user.searchUser.query(query);
    return result;
  } catch (error: any) {
    console.log("error message", error?.data?.message);
    console.log("error", error);
    return error;
  }
}
