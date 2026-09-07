const Leader = require("../models/Leader");
const createCrudController = require("./crudFactory");

module.exports = createCrudController(Leader, {
  slugField: "name",
  defaultSort: { order: 1, name: 1 },
  publicFilter: { published: true },
  searchableFields: ["name", "role"],
});
