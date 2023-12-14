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
