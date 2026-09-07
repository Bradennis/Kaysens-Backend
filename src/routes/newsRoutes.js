const buildRouter = require("./routeFactory");
const controller = require("../controllers/newsController");

module.exports = buildRouter(controller, { hasSlug: true });
