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

  // unfollow user
  unfollowUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { db } = ctx;
      const { userId } = input;
      const UserToUnfollow = await db.user.findUnique({
        where: { id: userId },
      });
      if (!UserToUnfollow) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      await db.user.update({
        where: { id: userId },
        data: {
          followers: {
            disconnect: { id: ctx.user.userId },
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
        data: { following: { disconnect: { id: userId } } },
      });

      return { success: true };
    }),

  // get list of following
  getFollowing: protectedProcedure.query(async ({ ctx }) => {
    const { db } = ctx;
    const following = await db.user.findUnique({
      where: { id: ctx.user.userId },
      include: {
        following: {
          select: {
            id: true,
            name: true,
            profileImage: true,
            emailVerified: true,
          },
        },
      },
    });

    if (!following) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }
    return {
      success: true,
      data: following.following,
    };
  }),

  //get followers list
  getFollowers: protectedProcedure.query(async ({ ctx }) => {
    const { db } = ctx;
    const followers = await db.user.findUnique({
      where: { id: ctx.user.userId },
      include: {
        followers: {
          select: {
            id: true,
            name: true,
            profileImage: true,
            emailVerified: true,
          },
        },
      },
    });

    if (!followers) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }
    return {
      success: true,
      data: followers.followers,
    };
  }),
});
