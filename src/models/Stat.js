const mongoose = require("mongoose");

const statSchema = new mongoose.Schema(
  {
    value: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
    group: {
      type: String,
      enum: ["home", "csr"],
      default: "home",
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

statSchema.index({ group: 1, order: 1 });

module.exports = mongoose.model("Stat", statSchema);
