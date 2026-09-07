const NewsArticle = require("../models/NewsArticle");
const createCrudController = require("./crudFactory");

module.exports = createCrudController(NewsArticle, {
  slugField: "title",
  defaultSort: { date: -1 },
  publicFilter: { published: true },
  searchableFields: ["title", "excerpt", "body"],
});
