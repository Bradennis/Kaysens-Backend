const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ContactMessage = require("../models/ContactMessage");

// @desc  Submit the public contact form
// @route POST /api/contact
const submitMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    throw new ApiError(400, "Name, email, subject and message are all required");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    throw new ApiError(400, "Please provide a valid email address");
  }

  const entry = await ContactMessage.create({ name, email, subject, message });
  res.status(201).json({
    success: true,
    data: { id: entry._id },
    message: "Thanks — we've received your message and will respond shortly.",
  });
});

// @desc  List submitted messages (admin)
// @route GET /api/contact
const listMessages = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  const messages = await ContactMessage.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: messages.length, data: messages });
});

// @desc  Update a message's status (admin)
// @route PATCH /api/contact/:id
const updateMessage = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true },
  );
  if (!message) throw new ApiError(404, "Message not found");
  res.json({ success: true, data: message });
});

// @desc  Delete a message (admin)
// @route DELETE /api/contact/:id
const removeMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!message) throw new ApiError(404, "Message not found");
  res.json({ success: true, data: {} });
});

module.exports = { submitMessage, listMessages, updateMessage, removeMessage };
