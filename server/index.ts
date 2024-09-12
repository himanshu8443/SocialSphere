import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";
import { createContext } from "./trpc/context";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://socialspherex.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
dotenv.config();
app.use(express.json());

app.use(
  "/api",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

export type AppRouter = typeof appRouter;
