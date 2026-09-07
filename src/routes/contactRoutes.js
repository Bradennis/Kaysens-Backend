const express = require("express");
const { protect, requireRole } = require("../middleware/auth");
const {
  submitMessage,
  listMessages,
  updateMessage,
  removeMessage,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", submitMessage);
router.get("/", protect, requireRole("admin", "editor"), listMessages);
router.patch("/:id", protect, requireRole("admin", "editor"), updateMessage);
router.delete("/:id", protect, requireRole("admin"), removeMessage);

module.exports = router;
