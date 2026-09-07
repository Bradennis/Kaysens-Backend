const buildRouter = require("./routeFactory");
const controller = require("../controllers/businessController");

module.exports = buildRouter(controller, { hasSlug: true });
