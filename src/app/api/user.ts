import { trpc } from "../../trpc/trpc";

export enum UserIncludes {
  posts = "posts",
  comments = "comments",
  friends = "friends",
  likedPosts = "likedPosts",
  savedPosts = "savedPosts",
  pendingFriends = "pendingFriends",
  preferences = "preferences",
}
export async function getUserDetails(...args: UserIncludes[]) {
  try {
    const result = await trpc.user.getUserDetails.query(args);
    console.log("result", result);
    return {
      success: true,
      message: "Successfully got user details",
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
