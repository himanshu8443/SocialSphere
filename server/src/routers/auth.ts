import { TRPCError } from "@trpc/server";
import { router, publicProcedure, protectedProcedure } from "../trpc/trpc";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const authRouter = router({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        profileImage: z.string().url().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, email, password, profileImage } = input;
      if (!name || !email || !password) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Missing required fields",
        });
      }
      const userExists = await ctx.db.user.findUnique({
        where: {
          email,
        },
      });
      if (userExists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already exists",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await ctx.db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          profileImage,
        },
      });
      user.password = "";
      return user;
    }),

  // Login
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      if (!email || !password) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Missing required fields",
        });
      }
      const user = await ctx.db.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
          cause: "User does not exist",
        });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        });
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

      ctx.res.setHeader(
        "Set-Cookie",
        `token=${token}; path=/; httponly; max-age=31536000;`
      );
      user.password = "";
      return {
        code: "",
        message: "",
        data: user,
      };
    }),

  // Logout
  logout: publicProcedure.mutation(async ({ ctx }) => {
    ctx.res.setHeader(
      "Set-Cookie",
      `token=; path=/; expires=${new Date(
        Date.now() + 1000 * 60 * 60 * 24 * 365
      ).toUTCString()}; httponly`
    );
    return {
      data: "User logged out",
    };
  }),
});
