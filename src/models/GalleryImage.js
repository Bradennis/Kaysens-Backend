const mongoose = require("mongoose");

const galleryImageSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    alt: { type: String, default: "" },
    span: { type: String, default: "" }, // e.g. "row-span-2", "col-span-2"
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

galleryImageSchema.index({ order: 1 });

module.exports = mongoose.model("GalleryImage", galleryImageSchema);
