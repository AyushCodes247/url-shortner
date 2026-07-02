import asyncHandler from "@utils/asyncHandler.util";
import urlCreateService from "@/services/urls/u_create.service";

const u_create = asyncHandler(async (req, res) => {
  const { url, customAlias, title } = req.body;
  const upi = req.user?.publicId;

  const { shortUrl, shareCount, titleResponse, clickCount, isActive, urlId } =
    await urlCreateService({
      publicId: String(upi),
      originalUrl: url,
      customAlias,
      title,
    });

  return res.status(201).json({
    success: true,
    message: "Short url created successfully.",
    data: {
      shortUrl,
      urlId,
      shareCount,
      titleResponse,
      clickCount,
      isActive,
    },
  });
});

export default u_create;
