import { router } from "../trpc/trpc";
import { authRouter } from "./auth";
import { userRouter } from "./user";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
});
