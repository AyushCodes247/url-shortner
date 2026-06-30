import asyncHandler from "@utils/asyncHandler.util";
import { registerService } from "@services/authentication/register.service";
import env from "@/configs/dotenv.config";

const REFRESH_COOKIE = "url_shortner_cookie";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, gender } = req.body;

  const { user, accessToken, refreshToken } = await registerService({
    name,
    email,
    password,
    gender,
  });

  const isProduction = env.NODE_ENV === "production";

  res.cookie(REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  return res.status(201).json({
    success: true,
    message: "User registered successfully.",
    user,
    accessToken,
  });
});
