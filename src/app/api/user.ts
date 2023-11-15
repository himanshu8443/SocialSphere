import { trpc } from "../../trpc/trpc";

export type UserIncludes =
  | "posts"
  | "comments"
  | "friends"
  | "likedPosts"
  | "savedPosts"
  | "pendingFriends"
  | "preferences";

export async function getUserDetails(...args: UserIncludes[]) {
  try {
    const result = await trpc.user.getUserDetails.query(args);
    return result;
  } catch (error: any) {
    // console.log("error message", error?.data?.message);
    // console.log("error", error);
    return error;
  }
}
