import db from "@/index";
import { eq } from "drizzle-orm";

import { userTable } from "@db/user.schema";

import { AppError } from "@utils/error.util";

import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "@utils/auth.util";

import { storeSession } from "@/services/redis/session.redis.service";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  gender: "male" | "female" | "other" | "prefer_not_to_say";
}

export interface ReturnType {
  user: {
    publicId: string;
    name: string;
    email: string;
    gender: string;
  };
  accessToken: string;
  refreshToken: string;
}

export const registerService = async (
  data: RegisterData,
): Promise<ReturnType> => {
  const existingUser = await db.query.userTable.findFirst({
    where: eq(userTable.email, data.email),
  });

  if (existingUser) {
    throw new AppError("User already exists.", 409);
  }

  const hashedPassword = await hashPassword(data.password);

  const [user] = await db
    .insert(userTable)
    .values({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      gender: data.gender,
    })
    .returning({
      publicId: userTable.publicId,
      name: userTable.name,
      email: userTable.email,
      gender: userTable.gender,
    });

  if (!user) {
    throw new AppError("Failed to register user.", 500);
  }

  const payload = {
    publicId: user.publicId,
    name: user.name,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await storeSession(user.publicId, refreshToken);

  return {
    user,
    accessToken,
    refreshToken,
  };
};
