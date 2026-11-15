import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const healthRouter = Router();

healthRouter.get("/", async (_req, res, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      ok: true,
      service: "aseer-group-backend",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
});
