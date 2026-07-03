import asyncHandler from "@utils/asyncHandler.util";

import urlGetOneService from "@services/urls/u_getOne.service";

const u_getOne = asyncHandler(async (req, res) => {
  const { urlId } = req.params;

  const url = await urlGetOneService({
    urlId : String(urlId),
  });

  return res.status(200).json({
    success: true,
    message: "URL fetched successfully.",
    url,
  });
});

export default u_getOne;