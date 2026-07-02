import { Router } from "express";
import { register } from "@controllers/authentication/register.controller";
import login from "@controllers/authentication/login.controller";
import verifyUser from "@middlewares/authentication/verifyUser.middleware";
import profile from "@controllers/authentication/profile.controller";
import logout from "@controllers/authentication/logout.controller";
import refresh from "@controllers/authentication/refresh.controller";
import otp from "@controllers/authentication/otp.controller";
import verifyOtp from "@controllers/authentication/verifyOtp.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyUser, logout);
router.post("/refresh", refresh);

router.get("/profile", verifyUser, profile);

router.post("/otp", verifyUser, otp);
router.post("/verify-otp", verifyUser, verifyOtp);


export default router;
