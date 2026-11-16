import crypto from "node:crypto";
import "dotenv/config";

const fallbackJwtSecret = crypto
  .createHash("sha256")
  .update(process.env.DATABASE_URL ?? "aseer-group-dev-secret")
  .digest("hex");

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: process.env.JWT_SECRET ?? fallbackJwtSecret,
  supabaseUrl: process.env.SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY ?? "",
  corsOrigins: (
    process.env.CORS_ORIGINS ??
    "http://localhost:3000,http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176,http://localhost:5177,https://theaseergroup.com,https://www.theaseergroup.com,https://admin.theaseergroup.com,https://travel.theaseergroup.com,https://transport.theaseergroup.com,https://rise.theaseergroup.com"
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};
