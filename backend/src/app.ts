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

app.use(helmet());
app.use(
  cors({
    origin: env.corsOrigins,
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));

const apiV1 = express.Router();
apiV1.use("/health", healthRouter);
apiV1.use("/auth", authRouter);
apiV1.use("/admin", adminRouter);
apiV1.use("/subsidiaries", subsidiariesRouter);
apiV1.use("/", submissionsRouter);

app.use("/api/v1", apiV1);

app.use(notFoundHandler);
app.use(errorHandler);
