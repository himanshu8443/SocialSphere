import { router } from "../trpc/trpc";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { postRouter } from "./post";
import { commentsRouter } from "./comments";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  posts: postRouter,
  comments: commentsRouter,
});
