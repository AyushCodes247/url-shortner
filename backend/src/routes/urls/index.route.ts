import { Router } from "express";
import u_create from "@controllers/urls/u_create.controller";
import verifyUser from "@middlewares/authentication/verifyUser.middleware";
import u_redirect from "@controllers/urls/u_redirect.controller";
import u_delete from "@controllers/urls/u_delete.controller";
import u_getAll from "@/controllers/urls/u_getAll.controller";
import u_getOne from "@/controllers/urls/u_getOne.controller";
import u_update from "@/controllers/urls/u_update.controller";

const router = Router();

router.post("/create", verifyUser, u_create);

router.get("/r/:shortCode", u_redirect);
router.get("/get-all", verifyUser, u_getAll);
router.get("/:urlId", verifyUser, u_getOne);

router.patch("/:urlId", verifyUser, u_update);
router.delete("/delete/:urlId", verifyUser, u_delete);

export default router;
