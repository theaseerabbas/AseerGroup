import { InquiryType, SubmissionStatus, type Prisma } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

export const adminRouter = Router();
adminRouter.use(requireAuth);

const statusUpdateSchema = z.object({
  status: z.nativeEnum(SubmissionStatus).optional(),
  adminNotes: z.string().max(4000).nullable().optional(),
});

function parseStatus(raw: unknown): SubmissionStatus | undefined {
  if (typeof raw !== "string" || !raw || raw === "ALL") return undefined;
  return Object.values(SubmissionStatus).includes(raw as SubmissionStatus)
    ? (raw as SubmissionStatus)
    : undefined;
}

function parseInquiryType(raw: unknown): InquiryType | undefined {
  if (typeof raw !== "string" || !raw || raw === "ALL") return undefined;
  return Object.values(InquiryType).includes(raw as InquiryType)
    ? (raw as InquiryType)
    : undefined;
}

async function resolveSubsidiaryFilter(slug: unknown) {
  if (typeof slug !== "string" || !slug) return undefined;
  const sub = await prisma.subsidiary.findUnique({
    where: { slug },
    select: { id: true },
  });
  return sub?.id;
}

adminRouter.get("/overview", async (req, res, next) => {
  try {
    const slug = typeof req.query.subsidiary === "string" ? req.query.subsidiary : "parent";
    const subsidiary = await prisma.subsidiary.findUnique({
      where: { slug },
      select: { id: true, slug: true, name: true, tagline: true, sector: true },
    });

    const subFilter = subsidiary ? { subsidiaryId: subsidiary.id } : {};

    const [
      careersTotal,
      careersNew,
      pitchesTotal,
      pitchesNew,
      inquiriesTotal,
      inquiriesNew,
      subsidiaries,
    ] = await Promise.all([
      prisma.careerApplication.count({ where: subFilter }),
      prisma.careerApplication.count({ where: { ...subFilter, status: SubmissionStatus.NEW } }),
      prisma.venturePitch.count({ where: subFilter }),
      prisma.venturePitch.count({ where: { ...subFilter, status: SubmissionStatus.NEW } }),
      prisma.inquiry.count({ where: subFilter }),
      prisma.inquiry.count({ where: { ...subFilter, status: SubmissionStatus.NEW } }),
      prisma.subsidiary.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "asc" },
        select: {
          slug: true,
          name: true,
          sector: true,
          _count: {
            select: {
              inquiries: true,
              careerApplications: true,
              venturePitches: true,
            },
          },
        },
      }),
    ]);

    res.json({
      ok: true,
      data: {
        subsidiary,
        counts: {
          careersTotal,
          careersNew,
          pitchesTotal,
          pitchesNew,
          inquiriesTotal,
          inquiriesNew,
          pendingTotal: careersNew + pitchesNew + inquiriesNew,
        },
        subsidiaries,
      },
    });
  } catch (err) {
    next(err);
  }
});

adminRouter.get("/careers", async (req, res, next) => {
  try {
    const subsidiaryId = await resolveSubsidiaryFilter(req.query.subsidiary);
    const status = parseStatus(req.query.status);
    const search = typeof req.query.search === "string" ? req.query.search.trim() : "";

    const items = await prisma.careerApplication.findMany({
      where: {
        ...(subsidiaryId ? { subsidiaryId } : {}),
        ...(status ? { status } : {}),
        ...(search
          ? {
              OR: [
                { fullName: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { areaOfInterest: { contains: search, mode: "insensitive" } },
                { city: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
      include: { subsidiary: { select: { slug: true, name: true } } },
    });

    res.json({ ok: true, data: items });
  } catch (err) {
    next(err);
  }
});

adminRouter.patch("/careers/:id", async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const body = statusUpdateSchema.parse(req.body);
    const updated = await prisma.careerApplication.update({
      where: { id },
      data: {
        ...(body.status !== undefined ? { status: body.status } : {}),
        ...(body.adminNotes !== undefined ? { adminNotes: body.adminNotes } : {}),
      },
    });
    res.json({ ok: true, data: updated });
  } catch (err) {
    next(err);
  }
});

adminRouter.delete("/careers/:id", async (req, res, next) => {
  try {
    const id = String(req.params.id);
    await prisma.careerApplication.delete({ where: { id } });
    res.json({ ok: true, data: { id } });
  } catch (err) {
    next(err);
  }
});

adminRouter.get("/pitches", async (req, res, next) => {
  try {
    const subsidiaryId = await resolveSubsidiaryFilter(req.query.subsidiary);
    const status = parseStatus(req.query.status);
    const search = typeof req.query.search === "string" ? req.query.search.trim() : "";

    const items = await prisma.venturePitch.findMany({
      where: {
        ...(subsidiaryId ? { subsidiaryId } : {}),
        ...(status ? { status } : {}),
        ...(search
          ? {
              OR: [
                { ventureTitle: { contains: search, mode: "insensitive" } },
                { founderName: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { sector: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
      include: { subsidiary: { select: { slug: true, name: true } } },
    });

    res.json({ ok: true, data: items });
  } catch (err) {
    next(err);
  }
});

adminRouter.patch("/pitches/:id", async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const body = statusUpdateSchema.parse(req.body);
    const updated = await prisma.venturePitch.update({
      where: { id },
      data: {
        ...(body.status !== undefined ? { status: body.status } : {}),
        ...(body.adminNotes !== undefined ? { adminNotes: body.adminNotes } : {}),
      },
    });
    res.json({ ok: true, data: updated });
  } catch (err) {
    next(err);
  }
});

adminRouter.delete("/pitches/:id", async (req, res, next) => {
  try {
    const id = String(req.params.id);
    await prisma.venturePitch.delete({ where: { id } });
    res.json({ ok: true, data: { id } });
  } catch (err) {
    next(err);
  }
});

adminRouter.get("/inquiries", async (req, res, next) => {
  try {
    const subsidiaryId = await resolveSubsidiaryFilter(req.query.subsidiary);
    const status = parseStatus(req.query.status);
    const type = parseInquiryType(req.query.type);
    const search = typeof req.query.search === "string" ? req.query.search.trim() : "";

    const items = await prisma.inquiry.findMany({
      where: {
        ...(subsidiaryId ? { subsidiaryId } : {}),
        ...(status ? { status } : {}),
        ...(type ? { type } : {}),
        ...(search
          ? {
              OR: [
                { fullName: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { company: { contains: search, mode: "insensitive" } },
                { subject: { contains: search, mode: "insensitive" } },
                { message: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
      include: { subsidiary: { select: { slug: true, name: true } } },
    });

    res.json({ ok: true, data: items });
  } catch (err) {
    next(err);
  }
});

adminRouter.patch("/inquiries/:id", async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const body = statusUpdateSchema.parse(req.body);
    const updated = await prisma.inquiry.update({
      where: { id },
      data: {
        ...(body.status !== undefined ? { status: body.status } : {}),
        ...(body.adminNotes !== undefined ? { adminNotes: body.adminNotes } : {}),
      },
    });
    res.json({ ok: true, data: updated });
  } catch (err) {
    next(err);
  }
});

adminRouter.delete("/inquiries/:id", async (req, res, next) => {
  try {
    const id = String(req.params.id);
    await prisma.inquiry.delete({ where: { id } });
    res.json({ ok: true, data: { id } });
  } catch (err) {
    next(err);
  }
});

const serviceCreateSchema = z.object({
  subsidiarySlug: z.string().trim().min(1),
  slug: z.string().trim().min(2).max(120).optional(),
  title: z.string().trim().min(2, "Title is required.").max(160),
  category: z.string().trim().min(1).max(60).default("service"),
  summary: z.string().trim().max(1000).optional(),
  details: z.record(z.unknown()).optional(),
  sortOrder: z.number().int().min(0).max(10000).optional(),
  isActive: z.boolean().optional(),
});

const serviceUpdateSchema = z.object({
  title: z.string().trim().min(2).max(160).optional(),
  category: z.string().trim().min(1).max(60).optional(),
  summary: z.string().trim().max(1000).nullable().optional(),
  details: z.record(z.unknown()).nullable().optional(),
  sortOrder: z.number().int().min(0).max(10000).optional(),
  isActive: z.boolean().optional(),
});

function toSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

adminRouter.get("/services", async (req, res, next) => {
  try {
    const subsidiaryId = await resolveSubsidiaryFilter(req.query.subsidiary);
    const category = typeof req.query.category === "string" && req.query.category !== "all"
      ? req.query.category
      : undefined;

    const items = await prisma.service.findMany({
      where: {
        ...(subsidiaryId ? { subsidiaryId } : {}),
        ...(category ? { category } : {}),
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      include: { subsidiary: { select: { slug: true, name: true } } },
    });

    res.json({ ok: true, data: items });
  } catch (err) {
    next(err);
  }
});

adminRouter.post("/services", async (req, res, next) => {
  try {
    const input = serviceCreateSchema.parse(req.body);
    const sub = await prisma.subsidiary.findUnique({
      where: { slug: input.subsidiarySlug },
      select: { id: true },
    });

    if (!sub) {
      res.status(404).json({ ok: false, error: "Subsidiary not found" });
      return;
    }

    const baseSlug = toSlug(input.slug || input.title) || `item-${Date.now()}`;
    const existing = await prisma.service.findUnique({
      where: { subsidiaryId_slug: { subsidiaryId: sub.id, slug: baseSlug } },
      select: { id: true },
    });
    const finalSlug = existing ? `${baseSlug}-${Date.now().toString().slice(-4)}` : baseSlug;

    const created = await prisma.service.create({
      data: {
        subsidiaryId: sub.id,
        slug: finalSlug,
        title: input.title,
        category: input.category,
        summary: input.summary ?? null,
        ...(input.details ? { details: input.details as Prisma.InputJsonValue } : {}),
        sortOrder: input.sortOrder ?? 100,
        isActive: input.isActive ?? true,
      },
    });

    res.status(201).json({ ok: true, data: created });
  } catch (err) {
    next(err);
  }
});

adminRouter.patch("/services/:id", async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const body = serviceUpdateSchema.parse(req.body);
    const updated = await prisma.service.update({
      where: { id },
      data: {
        ...(body.title !== undefined ? { title: body.title } : {}),
        ...(body.category !== undefined ? { category: body.category } : {}),
        ...(body.summary !== undefined ? { summary: body.summary } : {}),
        ...(body.details !== undefined
          ? { details: body.details as Prisma.InputJsonValue }
          : {}),
        ...(body.sortOrder !== undefined ? { sortOrder: body.sortOrder } : {}),
        ...(body.isActive !== undefined ? { isActive: body.isActive } : {}),
      },
    });
    res.json({ ok: true, data: updated });
  } catch (err) {
    next(err);
  }
});

adminRouter.delete("/services/:id", async (req, res, next) => {
  try {
    const id = String(req.params.id);
    await prisma.service.delete({ where: { id } });
    res.json({ ok: true, data: { id } });
  } catch (err) {
    next(err);
  }
});
