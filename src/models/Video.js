const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    duration: { type: String, default: "" },
    poster: { type: String, required: true },
    url: { type: String, default: "" }, // optional external video URL (YouTube/Vimeo/mp4)
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

videoSchema.index({ order: 1 });

module.exports = mongoose.model("Video", videoSchema);
