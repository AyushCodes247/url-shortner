import asyncHandler from "@/utils/asyncHandler.util";

import urlRedirectService from "@services/urls/u_redirect.service";

const u_redirect = asyncHandler(async (req, res) => {
  const { shortCode } = req.params;

  const { originalUrl } = await urlRedirectService({
    shortCode: String(shortCode),
  });

  return res.redirect(301, originalUrl);
});

export default u_redirect;
