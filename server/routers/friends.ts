import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../trpc/trpc";
import { z } from "zod";

export const friendRouter = router({
  sendFriendRequest: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input, ctx }) => {}),
});
