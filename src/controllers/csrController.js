const CsrProgram = require("../models/CsrProgram");
const createCrudController = require("./crudFactory");

module.exports = createCrudController(CsrProgram, {
  defaultSort: { order: 1 },
  publicFilter: { published: true },
  searchableFields: ["title", "description"],
});
