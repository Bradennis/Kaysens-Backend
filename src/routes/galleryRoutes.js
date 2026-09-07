const buildRouter = require("./routeFactory");
const controller = require("../controllers/galleryController");

module.exports = buildRouter(controller, { hasSlug: false });
