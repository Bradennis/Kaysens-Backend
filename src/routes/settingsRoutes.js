const express = require("express");
const { protect, requireRole } = require("../middleware/auth");
const { getSettings, updateSettings } = require("../controllers/settingsController");

const router = express.Router();

router.get("/", getSettings);
router.put("/", protect, requireRole("admin", "editor"), updateSettings);

module.exports = router;
