import { Router } from "express";
import authenticationRoutes from "@routes/authentication/index.routes";
import urlRoutes from "@routes/urls/index.route";

const router = Router();

router.use("/authentication", authenticationRoutes);

router.use("/urls", urlRoutes);

export default router;
