import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server";
import { ZodError } from "zod";
import { createContext } from "./context";
import jwt, { JwtPayload } from "jsonwebtoken";

const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create({
    errorFormatter(opts) {
      const { shape, error } = opts;
      return {
        ...shape,
        data: {
          error: error,
          message:
            error.code === "BAD_REQUEST" && error.cause instanceof ZodError
              ? JSON.parse(error.message)[0].message
              : error.message,
        },
      };
    },
  });

export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (ctx?.req?.cookies?.token) {
    return next({
      ctx: {
        user: jwt.verify(
          ctx.req.cookies.token,
          process.env.JWT_SECRET!
        ) as JwtPayload,
      },
    });
  }
  throw new TRPCError({
    code: "UNAUTHORIZED",
    message: "You are not authorized to access this resource.",
  });
});

export const protectedProcedure = t.procedure.use(isAuthenticated);

const partialAuth = t.middleware(({ ctx, next }) => {
  if (ctx?.req?.cookies?.token) {
    return next({
      ctx: {
        user: jwt.verify(
          ctx.req.cookies.token,
          process.env.JWT_SECRET!
        ) as JwtPayload,
        isAuthenticated: true,
      },
    });
  }
  return next({
    ctx: {
      user: null,
      isAuthenticated: false,
    },
  });
});

export const partialAuthProcedure = t.procedure.use(partialAuth);
