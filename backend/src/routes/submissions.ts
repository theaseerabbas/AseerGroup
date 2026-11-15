import { InquiryType, type Prisma } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

export const submissionsRouter = Router();

const httpUrlSchema = z
  .string()
  .trim()
  .url("Must be a valid URL")
  .refine((val) => /^https?:\/\//i.test(val), "URL must start with https:// or http://");

async function resolveSubsidiaryId(slug?: string): Promise<string | null> {
  if (!slug) return null;
  const sub = await prisma.subsidiary.findUnique({
    where: { slug },
    select: { id: true },
  });
  return sub?.id ?? null;
}

const inquirySchema = z.object({
  subsidiarySlug: z.string().trim().min(1).optional(),
  type: z.nativeEnum(InquiryType).default(InquiryType.GENERAL),
  fullName: z.string().trim().min(2).max(150),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(7).max(40).optional(),
  company: z.string().trim().max(150).optional(),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(5).max(4000),
  details: z.record(z.unknown()).optional(),
});

submissionsRouter.post("/inquiries", async (req, res, next) => {
  try {
    const input = inquirySchema.parse(req.body);
    const subsidiaryId = await resolveSubsidiaryId(input.subsidiarySlug);

    const created = await prisma.inquiry.create({
      data: {
        subsidiaryId,
        type: input.type,
        fullName: input.fullName,
        email: input.email,
        phone: input.phone ?? null,
        company: input.company ?? null,
        subject: input.subject ?? null,
        message: input.message,
        ...(input.details ? { details: input.details as Prisma.InputJsonValue } : {}),
      },
      select: { id: true, type: true, status: true, createdAt: true },
    });

    res.status(201).json({ ok: true, data: created });
  } catch (err) {
    next(err);
  }
});

const careerSchema = z.object({
  subsidiarySlug: z.string().trim().min(1).optional(),
  areaOfInterest: z.string().trim().min(2).max(120),
  fullName: z.string().trim().min(2).max(150),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(7).max(40),
  city: z.string().trim().max(100).optional(),
  resumeUrl: httpUrlSchema,
  portfolioUrl: httpUrlSchema.optional(),
  coverNote: z.string().trim().max(2500).optional(),
});

submissionsRouter.post("/careers", async (req, res, next) => {
  try {
    const input = careerSchema.parse(req.body);
    const subsidiaryId = await resolveSubsidiaryId(input.subsidiarySlug);

    const created = await prisma.careerApplication.create({
      data: {
        subsidiaryId,
        areaOfInterest: input.areaOfInterest,
        fullName: input.fullName,
        email: input.email,
        phone: input.phone,
        city: input.city ?? null,
        resumeUrl: input.resumeUrl,
        portfolioUrl: input.portfolioUrl ?? null,
        coverNote: input.coverNote ?? null,
      },
      select: { id: true, status: true, createdAt: true },
    });

    res.status(201).json({ ok: true, data: created });
  } catch (err) {
    next(err);
  }
});

const pitchSchema = z.object({
  subsidiarySlug: z.string().trim().min(1).optional(),
  sector: z.string().trim().min(2).max(120),
  stage: z.string().trim().min(2).max(100),
  founderName: z.string().trim().min(2).max(150),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(7).max(40),
  city: z.string().trim().max(100).optional(),
  ventureTitle: z.string().trim().min(3).max(200),
  executiveSummary: z.string().trim().min(30).max(4000),
  proposalUrl: httpUrlSchema.optional(),
});

submissionsRouter.post("/pitches", async (req, res, next) => {
  try {
    const input = pitchSchema.parse(req.body);
    const subsidiaryId = await resolveSubsidiaryId(input.subsidiarySlug);

    const created = await prisma.venturePitch.create({
      data: {
        subsidiaryId,
        sector: input.sector,
        stage: input.stage,
        founderName: input.founderName,
        email: input.email,
        phone: input.phone,
        city: input.city ?? null,
        ventureTitle: input.ventureTitle,
        executiveSummary: input.executiveSummary,
        proposalUrl: input.proposalUrl ?? null,
      },
      select: { id: true, status: true, createdAt: true },
    });

    res.status(201).json({ ok: true, data: created });
  } catch (err) {
    next(err);
  }
});
