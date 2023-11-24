import { trpc } from "../../trpc/trpc";

export async function sendFriendRequest({ userId }: { userId: string }) {
  try {
    const result = await trpc.friends.sendFriendRequest.mutate({
      userId,
    });
    return result;
  } catch (error: any) {
    return error;
  }
}
