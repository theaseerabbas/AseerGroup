import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./lib/env.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { adminRouter } from "./routes/admin.js";
import { authRouter } from "./routes/auth.js";
import { healthRouter } from "./routes/health.js";
import { submissionsRouter } from "./routes/submissions.js";
import { subsidiariesRouter } from "./routes/subsidiaries.js";

export const app = express();

const helmetFn =
  (helmet as unknown as { default?: () => express.RequestHandler } & (() => express.RequestHandler));
app.use((helmetFn.default ?? helmetFn)());
const allowedOriginPatterns = [
  /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i,
  /^https:\/\/([a-z0-9-]+\.)?theaseergroup\.com$/i,
  /^https:\/\/[a-z0-9-]+\.vercel\.app$/i,
];

app.use(
  cors({
    origin(origin, callback) {
      if (
        !origin ||
        env.corsOrigins.includes(origin) ||
        allowedOriginPatterns.some((pattern) => pattern.test(origin))
      ) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.json({
    ok: true,
    service: "aseer-group-backend",
    health: "/api/v1/health",
  });
});

const apiV1 = express.Router();
apiV1.use("/health", healthRouter);
apiV1.use("/auth", authRouter);
apiV1.use("/admin", adminRouter);
apiV1.use("/subsidiaries", subsidiariesRouter);
apiV1.use("/", submissionsRouter);

app.use("/api/v1", apiV1);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
