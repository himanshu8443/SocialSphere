import { TRPCError } from "@trpc/server";
import { router, publicProcedure, protectedProcedure } from "../trpc/trpc";
import { z } from "zod";

export const postRouter = router({
  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string().optional(),
        src: z.string().url().optional(),
        type: z.enum(["image", "video"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { title, content, src, type } = input;
      if (!title || !content) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Missing required fields",
        });
      }
      const post = await ctx.db.post.create({
        data: {
          title,
          content,
          src,
          createdById: ctx.user.userId,
          type,
          updatedAt: new Date(),
        },
      });
      return post;
    }),
});
