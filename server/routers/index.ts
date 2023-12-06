import { router } from "../trpc/trpc";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { postRouter } from "./post";
import { commentsRouter } from "./comments";
import { followRouter } from "./friends";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  posts: postRouter,
  comments: commentsRouter,
  follow: followRouter,
});
