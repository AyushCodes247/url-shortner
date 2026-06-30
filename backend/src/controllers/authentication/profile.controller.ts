import asyncHandler from "@utils/asyncHandler.util";

const profile = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User profile fetched successfully.",
    user: req.user,
  });
});

export default profile;
