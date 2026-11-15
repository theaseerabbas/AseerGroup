import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const subsidiariesRouter = Router();

subsidiariesRouter.get("/", async (_req, res, next) => {
  try {
    const items = await prisma.subsidiary.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
      include: {
        services: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });
    res.json({ ok: true, data: items });
  } catch (err) {
    next(err);
  }
});

subsidiariesRouter.get("/:slug", async (req, res, next) => {
  try {
    const slug = String(req.params.slug);
    const item = await prisma.subsidiary.findUnique({
      where: { slug },
      include: {
        services: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (!item || !item.isActive) {
      res.status(404).json({ ok: false, error: "Subsidiary not found" });
      return;
    }

    res.json({ ok: true, data: item });
  } catch (err) {
    next(err);
  }
});
