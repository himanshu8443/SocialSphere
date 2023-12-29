import { trpc } from "../../trpc/trpc";
import { toast } from "react-toastify";

export async function followUser({ userId }: { userId: string }) {
  try {
    console.log("userId", userId);
    const result = await trpc.follow.followUser.mutate({
      userId,
    });
    toast.success("User followed");
    return result;
  } catch (error: any) {
    return error;
  }
}

export async function unfollowUser({ userId }: { userId: string }) {
  try {
    const result = await trpc.follow.unfollowUser.mutate({
      userId,
    });
    toast.success("User unfollowed");
    return result;
  } catch (error: any) {
    return error;
  }
}

// get following
export async function getFollowing() {
  try {
    const result = await trpc.follow.getFollowing.query();
    return result;
  } catch (error: any) {
    return error;
  }
}

// unfollow user by id
export async function unfollowUserById(userId: string) {
  try {
    const result = await trpc.follow.unfollowUser.mutate({
      userId,
    });
    toast.success("User unfollowed");
    return result;
  } catch (error: any) {
    return error;
  }
}

// get followers list
export async function getFollowers() {
  try {
    const result = await trpc.follow.getFollowers.query();
    return result;
  } catch (error: any) {
    return error;
  }
}
