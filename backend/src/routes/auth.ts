import { AdminRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Router } from "express";
import { z } from "zod";
import { env } from "../lib/env.js";
import { prisma } from "../lib/prisma.js";
import { requireAuth, signAdminToken } from "../middleware/auth.js";

export const authRouter = Router();

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

interface SupabaseAuthRow {
  id: string;
  email: string | null;
  encrypted_password: string | null;
  raw_user_meta_data: Record<string, unknown> | null;
}

async function verifyWithSupabaseRest(email: string, password: string) {
  const res = await fetch(`${env.supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: env.supabaseAnonKey,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) return null;
  const data = (await res.json()) as {
    user?: { email?: string; user_metadata?: Record<string, unknown> };
  };
  if (!data.user?.email) return null;
  const metaName =
    typeof data.user.user_metadata?.full_name === "string"
      ? data.user.user_metadata.full_name
      : typeof data.user.user_metadata?.name === "string"
        ? data.user.user_metadata.name
        : "Aseer Admin";
  return { email: data.user.email, name: metaName };
}

async function verifyWithSupabaseDb(email: string, password: string) {
  const rows = await prisma.$queryRawUnsafe<SupabaseAuthRow[]>(
    `SELECT id, email, encrypted_password, raw_user_meta_data
     FROM auth.users
     WHERE lower(email) = lower($1) AND deleted_at IS NULL
     LIMIT 1`,
    email,
  );

  const user = rows[0];
  if (!user?.email || !user.encrypted_password) return null;

  const matched = await bcrypt.compare(password, user.encrypted_password);
  if (!matched) return null;

  const meta = user.raw_user_meta_data ?? {};
  const name =
    typeof meta.full_name === "string"
      ? meta.full_name
      : typeof meta.name === "string"
        ? meta.name
        : "Aseer Admin";

  return { email: user.email, name };
}

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const verified =
      env.supabaseUrl && env.supabaseAnonKey
        ? await verifyWithSupabaseRest(email, password)
        : await verifyWithSupabaseDb(email, password);

    if (!verified) {
      res.status(401).json({ ok: false, error: "Invalid email or password." });
      return;
    }

    const adminUser = await prisma.adminUser.upsert({
      where: { email: verified.email.toLowerCase() },
      update: {},
      create: {
        email: verified.email.toLowerCase(),
        name: verified.name,
        passwordHash: "supabase-auth",
        role: AdminRole.SUPER_ADMIN,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
      },
    });

    if (!adminUser.isActive) {
      res.status(403).json({ ok: false, error: "This administrator account is disabled." });
      return;
    }

    const payload = {
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role,
    };

    const token = signAdminToken(payload);
    res.json({ ok: true, token, user: payload });
  } catch (err) {
    next(err);
  }
});

authRouter.get("/me", requireAuth, (req, res) => {
  res.json({ ok: true, user: req.admin });
});
