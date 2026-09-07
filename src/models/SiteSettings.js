const mongoose = require("mongoose");

const siteSettingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: "Kaysens Group" },
    tagline: { type: String, default: "Building Value Across Multiple Industries" },
    metaDescription: {
      type: String,
      default:
        "Kaysens Group is a diversified Ghanaian conglomerate operating across FMCG distribution, hospitality, energy and strategic ventures.",
    },
    footerTagline: { type: String, default: "Discipline. Integrity. Stewardship." },
    address: { type: String, default: "12 Independence Avenue, Airport Residential Area" },
    city: { type: String, default: "Accra, Ghana" },
    phone: { type: String, default: "+233 (0) 302 000 000" },
    email: { type: String, default: "hello@kaysensgroup.com" },
    pressEmail: { type: String, default: "press@kaysensgroup.com" },
    workingHours: {
      type: [String],
      default: ["Mon — Fri: 08:00 – 17:00", "Sat: 09:00 – 13:00"],
    },
    mapEmbedUrl: {
      type: String,
      default:
        "https://www.openstreetmap.org/export/embed.html?bbox=-0.2%2C5.58%2C-0.15%2C5.62&layer=mapnik",
    },
    social: {
      instagram: { type: String, default: "" },
      x: { type: String, default: "" },
      facebook: { type: String, default: "" },
      tiktok: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

// Enforce a single settings document via a fixed known id.
siteSettingsSchema.statics.getSingleton = async function getSingleton() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);
