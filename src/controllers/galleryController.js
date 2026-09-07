const GalleryImage = require("../models/GalleryImage");
const createCrudController = require("./crudFactory");

module.exports = createCrudController(GalleryImage, {
  defaultSort: { order: 1 },
  publicFilter: { published: true },
  searchableFields: ["alt"],
});
