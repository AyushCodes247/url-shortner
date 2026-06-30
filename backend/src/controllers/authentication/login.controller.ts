import asyncHandler from "@utils/asyncHandler.util";

import env from "@configs/dotenv.config";

import loginService from "@services/authentication/login.service";

const REFRESH_COOKIE = "url_shortner_cookie";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, accessToken, refreshToken } = await loginService({
    email,
    password,
  });

  const isProduction = env.NODE_ENV === "production";

  res.cookie(REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "User logged in successfully.",
    user,
    accessToken,
  });
});

export default login;
