import "dotenv/config";

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),
  corsOrigins: (
    process.env.CORS_ORIGINS ??
    "http://localhost:3000,http://localhost:5173,https://theaseergroup.com,https://www.theaseergroup.com"
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};
