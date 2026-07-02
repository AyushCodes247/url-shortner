import { Router } from "express";

const router = Router();

router.get("/check", (req,res) => {
    return res.status(200).json({
        success : true,
        message : "Url Shortner API is working fine."
    })
})

export default router;
