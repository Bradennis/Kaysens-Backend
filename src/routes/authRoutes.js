const express = require("express");
const { protect, requireRole } = require("../middleware/auth");
const {
  login,
  getMe,
  createUser,
  listUsers,
  updateMe,
  removeUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);

router.get("/users", protect, requireRole("admin"), listUsers);
router.post("/users", protect, requireRole("admin"), createUser);
router.delete("/users/:id", protect, requireRole("admin"), removeUser);

module.exports = router;
