const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// @desc  Upload an image and return its public URL
// @route POST /api/upload
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "No file was uploaded");

  const relativeUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({
    success: true,
    data: {
      url: relativeUrl,
      filename: req.file.filename,
      size: req.file.size,
    },
  });
});

module.exports = { uploadImage };
