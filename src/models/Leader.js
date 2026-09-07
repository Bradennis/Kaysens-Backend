const mongoose = require("mongoose");

const leaderSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    bio: { type: String, required: true },
    image: { type: String, required: true },
    linkedin: { type: String, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

leaderSchema.index({ order: 1 });

module.exports = mongoose.model("Leader", leaderSchema);
