import dotenv from "dotenv";
dotenv.config({ path: ".env" });

interface envType {
  PORT: number;
  DATABASE_URL: string;
  JWT_ACCESS_TOKEN: string;
  JWT_REFRESH_TOKEN: string;
  ORIGIN_URL: string;
  NODE_ENV: string;
  REDIS_HOST: string;
  REDIS_PASSWORD: string;
  REDIS_PORT: number;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_SECURE: boolean;
  MAIL_FROM: string;
  BASE_SHORT_URL: string;
}

const env: Partial<envType> = {
  PORT: Number(process.env.PORT) || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN,
  ORIGIN_URL: process.env.ORIGIN_URL,
  NODE_ENV: process.env.NODE_ENV,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: Number(process.env.REDIS_PORT),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: Number(process.env.SMTP_PORT),
  SMTP_SECURE: process.env.SMTP_SECURE === "true",
  MAIL_FROM: process.env.MAIL_USER,
  BASE_SHORT_URL: process.env.BASE_SHORT_URL,
};

if (!env) {
  throw new Error("ENV MISSING.");
}

export default env;
