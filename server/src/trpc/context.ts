import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { db } from "../../prisma/db";

export function createContext({ req, res }: CreateExpressContextOptions) {
  return {
    req,
    res,
    db,
  };
}
