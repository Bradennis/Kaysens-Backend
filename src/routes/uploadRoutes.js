const express = require("express");
const { protect, requireRole } = require("../middleware/auth");
const upload = require("../middleware/upload");
const { uploadImage } = require("../controllers/uploadController");

const router = express.Router();

router.post("/", protect, requireRole("admin", "editor"), upload.single("image"), uploadImage);

module.exports = router;
