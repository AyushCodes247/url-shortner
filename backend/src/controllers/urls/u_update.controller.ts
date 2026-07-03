import asyncHandler from "@utils/asyncHandler.util";

import urlUpdateService from "@services/urls/u_update.service";

const u_update = asyncHandler(async (req, res) => {
  const { urlId } = req.params;

  const { title, expirationDate, isActive } = req.body;

  const url = await urlUpdateService({
    urlId : String(urlId),
    title,
    expirationDate,
    isActive,
  });

  return res.status(200).json({
    success: true,
    message: "URL updated successfully.",
    url,
  });
});

export default u_update;
