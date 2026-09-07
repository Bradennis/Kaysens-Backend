const buildRouter = require("./routeFactory");
const controller = require("../controllers/leaderController");

module.exports = buildRouter(controller, { hasSlug: true });
