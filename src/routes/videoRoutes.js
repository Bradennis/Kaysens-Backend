const buildRouter = require("./routeFactory");
const controller = require("../controllers/videoController");

module.exports = buildRouter(controller, { hasSlug: false });
