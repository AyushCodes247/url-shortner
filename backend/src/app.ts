import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import router from "@routes/index.route";
import env from "@configs/dotenv.config";
import { errorHandler } from "@middlewares/error.middleware";

const app = express();

app.use(
  helmet({
    hsts: {
      maxAge: 31557600,
      includeSubDomains: true,
    },
  }),
);

app.use(
  cors({
    origin: env.ORIGIN_URL!,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);

app.use(express.json({ limit: "10kb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  }),
);

app.use(cookieParser());

app.use("/api/v1", router);

app.use(errorHandler);

export default app;
