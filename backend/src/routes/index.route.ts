import { Router } from "express";
import authenticationRoutes from "@routes/authentication/index.routes";

const router = Router();

router.use("/authentication", authenticationRoutes);

export default router;