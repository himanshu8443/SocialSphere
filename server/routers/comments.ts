import { TRPCError } from "@trpc/server";
import { router, publicProcedure, protectedProcedure } from "../trpc/trpc";
import { z } from "zod";

export const commentsRouter = router({
  // create a comment
  createComment: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        postId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { content, postId } = input;
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.user.userId,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }
      const post = await ctx.db.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (!post) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Post not found",
        });
      }
      const comment = await ctx.db.comment.create({
        data: {
          content,
          User: {
            connect: {
              id: ctx.user.userId,
            },
          },
          Post: {
            connect: {
              id: postId,
            },
          },
          updatedAt: new Date(),
        },
      });
      await ctx.db.user.update({
        where: {
          id: ctx.user.userId,
        },
        data: {
          comments: {
            connect: {
              id: comment.id,
            },
          },
        },
      });
      await ctx.db.post.update({
        where: {
          id: postId,
        },
        data: {
          Comment: {
            connect: {
              id: comment.id,
            },
          },
        },
      });
      const comments = await ctx.db.comment.findMany({
        where: {
          postId,
        },
        include: {
          User: {
            select: {
              id: true,
              name: true,
              profileImage: true,
            },
          },
        },
      });
      return {
        success: true,
        message: "Successfully created comment",
        data: comments,
      };
    }),

  // delete a comment
  deleteComment: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { commentId } = input;
      const comment = await ctx.db.comment.findFirst({
        where: {
          id: commentId,
        },
      });
      if (!comment) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Comment not found",
        });
      }
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.user.userId,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }
      const post = await ctx.db.post.findUnique({
        where: {
          id: comment.postId,
        },
      });
      if (!post) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Post not found",
        });
      }
      await ctx.db.comment.delete({
        where: {
          id: commentId,
        },
      });
      await ctx.db.user.update({
        where: {
          id: ctx.user.userId,
        },
        data: {
          comments: {
            disconnect: {
              id: commentId,
            },
          },
        },
      });
      await ctx.db.post.update({
        where: {
          id: comment.postId,
        },
        data: {
          Comment: {
            disconnect: {
              id: commentId,
            },
          },
        },
      });
      return {
        success: true,
        message: "Successfully deleted comment",
      };
    }),

  // get comments by post id
  getCommentsByPostId: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { postId } = input;
      const comments = await ctx.db.comment.findMany({
        where: {
          postId,
        },
        include: {
          User: {
            select: {
              id: true,
              name: true,
              profileImage: true,
            },
          },
        },
      });
      if (!comments) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Comments not found",
        });
      }
      return {
        success: true,
        message: "Successfully fetched comments",
        data: comments,
      };
    }),
});
