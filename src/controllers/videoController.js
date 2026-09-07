const Video = require("../models/Video");
const createCrudController = require("./crudFactory");

module.exports = createCrudController(Video, {
  defaultSort: { order: 1 },
  publicFilter: { published: true },
  searchableFields: ["title"],
});
