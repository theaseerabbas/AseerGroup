import { InquiryType, type Prisma } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

export const submissionsRouter = Router();

const httpUrlSchema = z
  .string()
  .trim()
  .url("Please enter a valid URL (for example, https://drive.google.com/...).")
  .refine((val) => /^https?:\/\//i.test(val), "URL must start with https:// or http://.");

const phoneRequiredSchema = z
  .string()
  .trim()
  .refine(
    (val) => /^[+\d\s().-]+$/.test(val) && val.replace(/\D/g, "").length >= 7,
    "Please enter a valid phone number (at least 7 digits).",
  )
  .refine((val) => val.length <= 40, "Phone number must be 40 characters or fewer.");

const phoneOptionalSchema = z.preprocess(
  (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
  phoneRequiredSchema.optional(),
);

const optionalUrlSchema = z.preprocess(
  (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
  httpUrlSchema.optional(),
);

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
  fullName: z.string().trim().min(2, "Please enter your full name.").max(150),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  phone: phoneOptionalSchema,
  company: z.string().trim().max(150).optional(),
  subject: z.string().trim().max(200).optional(),
  message: z
    .string()
    .trim()
    .min(5, "Please enter a message of at least 5 characters.")
    .max(4000, "Message must be 4000 characters or fewer."),
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
        company: input.company || null,
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
  areaOfInterest: z.string().trim().min(2, "Please select an area of interest.").max(120),
  fullName: z.string().trim().min(2, "Please enter your full name.").max(150),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  phone: phoneRequiredSchema,
  city: z.string().trim().max(100).optional(),
  resumeUrl: httpUrlSchema,
  portfolioUrl: optionalUrlSchema,
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
        city: input.city || null,
        resumeUrl: input.resumeUrl,
        portfolioUrl: input.portfolioUrl ?? null,
        coverNote: input.coverNote || null,
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
  sector: z.string().trim().min(2, "Please select a sector.").max(120),
  stage: z.string().trim().min(2, "Please select a stage.").max(100),
  founderName: z.string().trim().min(2, "Please enter your full name.").max(150),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  phone: phoneRequiredSchema,
  city: z.string().trim().max(100).optional(),
  ventureTitle: z
    .string()
    .trim()
    .min(3, "Please enter a venture or idea title (at least 3 characters).")
    .max(200),
  executiveSummary: z
    .string()
    .trim()
    .min(30, "Please provide at least 30 characters describing your idea.")
    .max(4000),
  proposalUrl: optionalUrlSchema,
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
        city: input.city || null,
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
