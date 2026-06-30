import { eq } from "drizzle-orm";

import db from "@/index";

import { userTable } from "@db/user.schema";

import asyncHandler from "@utils/asyncHandler.util";
import { verifyAccessToken } from "@utils/auth.util";
import { AppError } from "@utils/error.util";

const verifyUser = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new AppError("Unauthorized", 401);
  }

  let payload;

  try {
    payload = verifyAccessToken(token);
  } catch {
    throw new AppError("Unauthorized", 401);
  }

  const user = await db.query.userTable.findFirst({
    where: eq(userTable.publicId, payload.publicId),
    columns: {
      publicId: true,
      name: true,
      email: true,
      isVerified: true,
    },
  });

  if (!user) {
    throw new AppError("Unauthorized", 401);
  }

  req.user = {
    publicId: user.publicId,
    name: user.name,
    email: user.email,
    verified: user.isVerified,
  };

  return next();
});

export default verifyUser;
