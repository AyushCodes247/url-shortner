import db from "@/index";
import { eq } from "drizzle-orm";

import { userTable } from "@db/user.schema";

import { AppError } from "@utils/error.util";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyPassword,
} from "@utils/auth.util";

import { storeSession } from "@/services/redis/session.redis.service";

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    publicId: string;
    name: string;
    email: string;
    gender: string;
    isVerified: boolean;
  };
  accessToken: string;
  refreshToken: string;
}

const loginService = async (data: LoginData): Promise<LoginResponse> => {
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.email, data.email),
  });

  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  const isValidPassword = await verifyPassword(user.password, data.password);

  if (!isValidPassword) {
    throw new AppError("Invalid email or password.", 401);
  }

  await db
    .update(userTable)
    .set({
      lastLoginAt: new Date(),
    })
    .where(eq(userTable.id, user.id));

  const payload = {
    publicId: user.publicId,
    name: user.name,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await storeSession(user.publicId, refreshToken);

  return {
    user: {
      publicId: user.publicId,
      name: user.name,
      email: user.email,
      gender: user.gender,
      isVerified: user.isVerified,
    },
    accessToken,
    refreshToken,
  };
};

export default loginService;
