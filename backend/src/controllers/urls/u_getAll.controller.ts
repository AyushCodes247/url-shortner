import asyncHandler from "@utils/asyncHandler.util";
import urlGetAllService from "@services/urls/u_getAll.service";

const u_getAll = asyncHandler(async (req, res) => {
  const uid = req.user?.publicId;

  const result = await urlGetAllService({ userId: String(uid) });

  return res.status(200).json({
    success: true,
    message: "All urls fetched successfully.",
    result,
  });
});

export default u_getAll;