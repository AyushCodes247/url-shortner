import asyncHandler from "@utils/asyncHandler.util";

import urlDeleteService from "@services/urls/u_delete.service";

const u_delete = asyncHandler(async (req, res) => {
  const { urlId } = req.params;

  const deletedUrl = await urlDeleteService({
    urlId: String(urlId),
  });

  return res.status(200).json({
    success: true,
    message: "URL deleted successfully.",
    url: deletedUrl,
  });
});

export default u_delete;
