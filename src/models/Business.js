const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema(
  { icon: String, title: String, text: String },
  { _id: false },
);

const roomSchema = new mongoose.Schema(
  { name: String, desc: String, image: String },
  { _id: false },
);

const simpleItemSchema = new mongoose.Schema(
  { title: String, desc: String },
  { _id: false },
);

const businessSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    short: { type: String, required: true, trim: true }, // e.g. "Distribution"
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: {
      type: String,
      enum: ["distribution", "hotel", "energy", "ventures", "enterprise"],
      default: "enterprise",
    },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },

    // Category-specific content blocks, managed through the CMS.
    features: [featureSchema],
    brands: [String],
    rooms: [roomSchema],
    amenities: [{ icon: String, label: String }],
    products: [simpleItemSchema],
    safetyPoints: [String],
    ventures: [simpleItemSchema],
  },
  { timestamps: true },
);

businessSchema.index({ order: 1 });

module.exports = mongoose.model("Business", businessSchema);
