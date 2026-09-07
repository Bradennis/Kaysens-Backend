const mongoose = require("mongoose");

const newsArticleSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    date: { type: Date, required: true, default: Date.now },
    excerpt: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String, required: true },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

newsArticleSchema.index({ date: -1 });

module.exports = mongoose.model("NewsArticle", newsArticleSchema);
