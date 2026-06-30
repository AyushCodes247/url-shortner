import db from "@/index";
import { eq } from "drizzle-orm";

import { userTable } from "@db/user.schema";

import {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} from "@utils/auth.util";

import { AppError } from "@utils/error.util";

import { verifySession, rotateSession } from "@/services/redis/session.redis.service";

export interface RefreshResponse {
  user: {
    publicId: string;
    name: string;
    email: string;
    gender: string;
  };
  accessToken: string;
  refreshToken: string;
}

const refreshService = async (
  refreshToken: string,
): Promise<RefreshResponse> => {
  let payload;

  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw new AppError("Unauthorized", 401);
  }

  const validSession = await verifySession(payload.publicId, refreshToken);

  if (!validSession) {
    throw new AppError("Session expired.", 401);
  }

  const user = await db.query.userTable.findFirst({
    where: eq(userTable.publicId, payload.publicId),
    columns: {
      publicId: true,
      name: true,
      email: true,
      gender: true,
    },
  });

  if (!user) {
    throw new AppError("Unauthorized.", 401);
  }

  const jwtPayload = {
    publicId: user.publicId,
    name: user.name,
  };

  const newAccessToken = generateAccessToken(jwtPayload);
  const newRefreshToken = generateRefreshToken(jwtPayload);

  await rotateSession(user.publicId, newRefreshToken);

  return {
    user,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export default refreshService;
