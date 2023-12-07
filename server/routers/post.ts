import { TRPCError } from "@trpc/server";
import {
  router,
  publicProcedure,
  protectedProcedure,
  partialAuthProcedure,
} from "../trpc/trpc";
import { z } from "zod";

export const postRouter = router({
  // Create a post
  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string().optional(),
        src: z.string().optional(),
        type: z.enum(["image", "video", "text"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { title, content, src, type } = input;
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

      await ctx.db.user.update({
        where: {
          id: ctx.user.userId,
        },
        data: {
          posts: {
            connect: {
              id: post.id,
            },
          },
        },
      });
      return {
        success: true,
        message: "Post created",
        data: post,
      };
    }),

  // Update a post
  updatePost: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        content: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, title, content } = input;

      const ifUserOwnsPost = await ctx.db.post.findFirst({
        where: {
          id,
          createdById: ctx.user.userId,
        },
      });
      if (!ifUserOwnsPost) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User does not own post",
        });
      }

      const post = await ctx.db.post.update({
        where: {
          id,
        },
        data: {
          title,
          content,
          updatedAt: new Date(),
        },
      });
      return post;
    }),

  // Delete a post
  deletePost: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const id = input;
      const ifUserOwnsPost = await ctx.db.post.findFirst({
        where: {
          id,
          createdById: ctx.user.userId,
        },
      });
      if (!ifUserOwnsPost) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User does not own post",
        });
      }
      const post = await ctx.db.post.delete({
        where: {
          id,
        },
      });
      const user = await ctx.db.user.update({
        where: {
          id: ctx.user.userId,
        },
        data: {
          posts: {
            disconnect: {
              id: post.id,
            },
          },
        },
      });
      return post;
    }),

  // Get all posts by created date
  getPosts: partialAuthProcedure
    .input(z.number().optional())
    .query(async ({ input, ctx }) => {
      const limit = input || 999;
      // check if user is authenticated
      if (ctx.isAuthenticated) {
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
      }

      const posts = await ctx.db.post.findMany({
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          User: {
            select: {
              id: true,
              name: true,
              profileImage: true,
              emailVerified: true,
              followers: ctx.isAuthenticated && {
                where: {
                  id: ctx.user.userId,
                },
                select: {
                  id: true,
                },
              },
            },
          },
          likedBy: ctx.isAuthenticated && {
            where: {
              id: ctx.user.userId,
            },
            select: {
              id: true,
            },
          },
        },
      });
      return {
        success: true,
        message: "Posts fetched",
        data: posts,
      };
    }),

  // Get a post by id
  getPostById: partialAuthProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const id = input;
      const post = await ctx.db.post.findUnique({
        where: {
          id,
        },
        include: {
          Comment: {
            include: {
              User: {
                select: {
                  id: true,
                  name: true,
                  profileImage: true,
                  emailVerified: true,
                },
              },
            },
          },
          User: {
            select: {
              id: true,
              name: true,
              profileImage: true,
              emailVerified: true,
            },
          },
          likedBy: ctx.isAuthenticated && {
            where: {
              id: ctx.user.userId,
            },
            select: {
              id: true,
            },
          },
        },
      });
      return {
        success: true,
        message: "Post fetched",
        data: post,
      };
    }),

  // Like/Unlike a post
  LikeUnlikePost: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const postId = input;
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
      const ifUserAlreadyLikedPost = await ctx.db.post.findFirst({
        where: {
          id: postId,
          likedBy: {
            some: {
              id: ctx.user.userId,
            },
          },
        },
      });
      if (ifUserAlreadyLikedPost) {
        const post = await ctx.db.post.update({
          where: {
            id: postId,
          },
          data: {
            likedBy: {
              disconnect: {
                id: ctx.user.userId,
              },
            },
          },
        });
        await ctx.db.user.update({
          where: {
            id: ctx.user.userId,
          },
          data: {
            likedPosts: {
              disconnect: {
                id: post.id,
              },
            },
          },
        });
        await ctx.db.post.update({
          where: {
            id: postId,
          },
          data: {
            likes: {
              decrement: 1,
            },
          },
        });
        return {
          success: true,
          message: "Post unliked",
          data: post,
        };
      } else {
        const post = await ctx.db.post.update({
          where: {
            id: postId,
          },
          data: {
            likedBy: {
              connect: {
                id: ctx.user.userId,
              },
            },
          },
        });
        await ctx.db.user.update({
          where: {
            id: ctx.user.userId,
          },
          data: {
            likedPosts: {
              connect: {
                id: post.id,
              },
            },
          },
        });
        await ctx.db.post.update({
          where: {
            id: postId,
          },
          data: {
            likes: {
              increment: 1,
            },
          },
        });
        return {
          success: true,
          message: "Post liked",
          data: post,
        };
      }
    }),

  // Get posts of users that the current user follows
  getFollowingPosts: protectedProcedure
    .input(z.number().optional())
    .query(async ({ ctx, input }) => {
      const limit = input || 999;
      const followingList = await ctx.db.user.findUnique({
        where: {
          id: ctx.user.userId,
        },
        select: {
          following: {
            select: {
              id: true,
            },
          },
        },
      });

      const followingIds = followingList?.following.map((user) => user.id);

      const posts = await ctx.db.post.findMany({
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          createdById: {
            in: followingIds,
          },
        },
        include: {
          User: {
            select: {
              id: true,
              name: true,
              profileImage: true,
              emailVerified: true,
              followers: {
                where: {
                  id: ctx.user.userId,
                },
                select: {
                  id: true,
                },
              },
            },
          },
          likedBy: {
            where: {
              id: ctx.user.userId,
            },
            select: {
              id: true,
            },
          },
        },
      });

      return {
        success: true,
        message: "Posts fetched",
        data: posts,
      };
    }),
});
