import { Router } from "express";
import u_create from "@controllers/urls/u_create.controller";
import verifyUser from "@middlewares/authentication/verifyUser.middleware";
import u_redirect from "@/controllers/urls/u_redirect.controller";

const router = Router();

router.post("/create", verifyUser, u_create);

router.get("/r/:shortCode", u_redirect);

export default router;
