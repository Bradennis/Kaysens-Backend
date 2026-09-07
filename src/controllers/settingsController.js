const asyncHandler = require("../utils/asyncHandler");
const SiteSettings = require("../models/SiteSettings");

// @desc  Get site-wide settings (public)
// @route GET /api/settings
const getSettings = asyncHandler(async (req, res) => {
  const settings = await SiteSettings.getSingleton();
  res.json({ success: true, data: settings });
});

// @desc  Update site-wide settings (admin)
// @route PUT /api/settings
const updateSettings = asyncHandler(async (req, res) => {
  const settings = await SiteSettings.getSingleton();
  Object.assign(settings, req.body);
  await settings.save();
  res.json({ success: true, data: settings });
});

module.exports = { getSettings, updateSettings };
