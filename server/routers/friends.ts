import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../trpc/trpc";
import { z } from "zod";

export const followRouter = router({
  followUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { userId } = input;
      const { db } = ctx;
      const UserToFollow = await db.user.findUnique({ where: { id: userId } });
      if (!UserToFollow) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      await db.user.update({
        where: { id: userId },
        data: {
          followers: {
            connect: { id: ctx.user.userId },
          },
        },
      });
      const followingUser = await db.user.findUnique({
        where: { id: ctx.user.userId },
        include: { following: true },
      });
      if (!followingUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      await db.user.update({
        where: { id: ctx.user.userId },
        data: { following: { connect: { id: userId } } },
      });

      return { success: true };
    }),
});
