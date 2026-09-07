const buildRouter = require("./routeFactory");
const controller = require("../controllers/csrController");

module.exports = buildRouter(controller, { hasSlug: false });
