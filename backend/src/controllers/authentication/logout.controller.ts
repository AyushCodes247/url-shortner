import asyncHandler from "@utils/asyncHandler.util";
import env from "@configs/dotenv.config";
import logoutService from "@services/authentication/logout.service";

const REFRESH_COOKIE = "url_shortner_cookie";

const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.[REFRESH_COOKIE];

  if (refreshToken) {
    await logoutService(refreshToken);
  }

  const isProduction = env.NODE_ENV === "production";

  res.clearCookie(REFRESH_COOKIE, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "User logged out successfully.",
  });
});

export default logout;
