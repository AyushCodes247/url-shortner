import db from "@/index";
import { eq, and } from "drizzle-orm";

import { userTable } from "@db/user.schema";

import { AppError } from "@utils/error.util";

import { verifyOtp, deleteOtp } from "@services/redis/otp.redis.service";

export interface VerifyOtpData {
  publicId: string;
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  isVerified: boolean;
}

const verifyOtpService = async (
  data: Partial<VerifyOtpData>,
): Promise<VerifyOtpResponse> => {
  const isValidOtp = await verifyOtp(String(data.email), String(data.otp));

  if (!isValidOtp) {
    throw new AppError("Invalid or expired OTP.", 400);
  }

  const [user] = await db
    .update(userTable)
    .set({
      isVerified: true,
      emailVerifiedAt: new Date(),
    })
    .where(
      and(
        eq(userTable.publicId, String(data.publicId)),
        eq(userTable.email, String(data.email)),
        eq(userTable.isVerified, false),
      ),
    )
    .returning({
      publicId: userTable.publicId,
    });

  if (!user) {
    throw new AppError("User not found or already verified.", 404);
  }

  await deleteOtp(String(data.email));

  return {
    isVerified: true,
  };
};

export default verifyOtpService;
