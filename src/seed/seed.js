const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("../config/db");
const mongoose = require("mongoose");

const User = require("../models/User");
const Business = require("../models/Business");
const Leader = require("../models/Leader");
const NewsArticle = require("../models/NewsArticle");
const CsrProgram = require("../models/CsrProgram");
const Stat = require("../models/Stat");
const GalleryImage = require("../models/GalleryImage");
const Video = require("../models/Video");
const SiteSettings = require("../models/SiteSettings");

const {
  businesses,
  leaders,
  news,
  csrPrograms,
  homeStats,
  csrStats,
  galleryImages,
  videos,
} = require("./seedData");

async function destroy() {
  await connectDB();
  await Promise.all([
    Business.deleteMany(),
    Leader.deleteMany(),
    NewsArticle.deleteMany(),
    CsrProgram.deleteMany(),
    Stat.deleteMany(),
    GalleryImage.deleteMany(),
    Video.deleteMany(),
    SiteSettings.deleteMany(),
  ]);
  console.log("All content collections cleared.");
  await mongoose.disconnect();
  process.exit(0);
}

async function seed() {
  await connectDB();

  await Promise.all([
    Business.deleteMany(),
    Leader.deleteMany(),
    NewsArticle.deleteMany(),
    CsrProgram.deleteMany(),
    Stat.deleteMany(),
    GalleryImage.deleteMany(),
    Video.deleteMany(),
  ]);

  await Business.insertMany(businesses);
  await Leader.insertMany(leaders);
  await NewsArticle.insertMany(news);
  await CsrProgram.insertMany(csrPrograms);
  await Stat.insertMany([...homeStats, ...csrStats]);
  await GalleryImage.insertMany(galleryImages);
  await Video.insertMany(videos);
  await SiteSettings.getSingleton();

  const adminEmail = (process.env.ADMIN_EMAIL || "admin@kaysensgroup.com").toLowerCase();
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    await User.create({
      name: process.env.ADMIN_NAME || "Kaysens Admin",
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || "ChangeMe123!",
      role: "admin",
    });
    console.log(`Admin user created: ${adminEmail} (password from .env — change it after first login)`);
  } else {
    console.log(`Admin user already exists: ${adminEmail}`);
  }

  console.log("Database seeded successfully with Kaysens Group content.");
  await mongoose.disconnect();
  process.exit(0);
}

if (process.argv.includes("--destroy")) {
  destroy().catch((err) => {
    console.error(err);
    process.exit(1);
  });
} else {
  seed().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
