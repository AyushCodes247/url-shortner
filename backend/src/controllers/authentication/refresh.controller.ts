import asyncHandler from "@utils/asyncHandler.util";
import env from "@configs/dotenv.config";

import refreshService from "@services/authentication/refresh.service";

const REFRESH_COOKIE = "url_shortner_cookie";

const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies[REFRESH_COOKIE];

  if (!refreshToken) {
    throw new Error("Refresh token missing.");
  }

  const { user, accessToken, refreshToken: newRefreshToken } =
    await refreshService(refreshToken);

  const isProduction = env.NODE_ENV === "production";

  res.cookie(REFRESH_COOKIE, newRefreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "Token refreshed successfully.",
    user,
    accessToken,
  });
});

export default refresh;