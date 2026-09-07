const Business = require("../models/Business");
const createCrudController = require("./crudFactory");

module.exports = createCrudController(Business, {
  slugField: "name",
  defaultSort: { order: 1, name: 1 },
  publicFilter: { published: true },
  searchableFields: ["name", "short", "tagline"],
});
