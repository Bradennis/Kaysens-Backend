const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc  Authenticate an admin/editor user and return a JWT
// @route POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

  if (!user || !user.isActive || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(user._id);

  res.json({
    success: true,
    data: { user: user.toJSON(), token },
  });
});

// @desc  Get the currently authenticated user
// @route GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.user });
});

// @desc  Create a new CMS user (admin only)
// @route POST /api/auth/users
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email and password are required");
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) throw new ApiError(409, "A user with that email already exists");

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    role: role === "admin" ? "admin" : "editor",
  });

  res.status(201).json({ success: true, data: user });
});

// @desc  List all CMS users (admin only)
// @route GET /api/auth/users
const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json({ success: true, count: users.length, data: users });
});

// @desc  Update own profile / password
// @route PUT /api/auth/me
const updateMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("+password");
  if (!user) throw new ApiError(404, "User not found");

  if (req.body.name) user.name = req.body.name;
  if (req.body.password) user.password = req.body.password;

  await user.save();
  res.json({ success: true, data: user.toJSON() });
});

// @desc  Deactivate/remove a CMS user (admin only)
// @route DELETE /api/auth/users/:id
const removeUser = asyncHandler(async (req, res) => {
  if (req.params.id === String(req.user._id)) {
    throw new ApiError(400, "You cannot remove your own account");
  }
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new ApiError(404, "User not found");
  res.json({ success: true, data: {} });
});

module.exports = { login, getMe, createUser, listUsers, updateMe, removeUser };
