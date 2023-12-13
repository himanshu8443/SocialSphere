import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, publicProcedure } from "../trpc/trpc";
import { z } from "zod";

export const userRouter = router({
  // Get user
  getUserDetails: protectedProcedure
    .input(z.array(z.string().optional()).optional())
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.user.userId,
        },
        include: {
          posts: input?.includes("posts")
            ? { include: { Comment: true } }
            : false,
          comments: input?.includes("comments") ? true : false,
          followers: input?.includes("followers") ? true : false,
          likedPosts: input?.includes("likedPosts") ? true : false,
          savedPosts: input?.includes("savedPosts") ? true : false,
          following: input?.includes("following") ? true : false,
          preferences: input?.includes("preferences") ? true : false,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }
      user.password = "";
      return {
        success: true,
        message: "Successfully got user details",
        data: user,
      };
    }),
  getUserDetailsById: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: input,
        },
        include: {
          posts: {
            include: {
              Comment: true,
            },
          },
          followers: true,
          following: true,
          preferences: true,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }
      user.password = "";
      return {
        success: true,
        message: "Successfully got user details",
        data: user,
      };
    }),
});
