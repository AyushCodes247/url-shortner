import asyncHandler from "@utils/asyncHandler.util";
import verifyOtpService from "@services/authentication/verifyOtp.service";

const verifyOtp = asyncHandler(async (req, res) => {
  const payload = req.user;
  const { otp } = req.body;

  const { isVerified } = await verifyOtpService({
    publicId: payload?.publicId,
    email: payload?.email,
    otp,
  });

  return res.status(200).json({
    success: true,
    message: "User verified successfully.",
    isVerified,
  });
});

export default verifyOtp;
