import asyncHandler from "@utils/asyncHandler.util";
import otpService from "@services/authentication/otp.service";

const otp = asyncHandler(async (req, res) => {
  const info = await otpService({
    name: req.user?.name,
    email: req.user?.email,
  });

  return res.status(200).json({
    success: true,
    message: "Verification OTP sent successfully.",
    email: req.user?.email,
    mail: info,
  });
});

export default otp;
