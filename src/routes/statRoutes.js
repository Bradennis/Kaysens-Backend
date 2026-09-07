const buildRouter = require("./routeFactory");
const controller = require("../controllers/statController");

const router = buildRouter(controller, { hasSlug: false });
// Override the root GET so it supports ?group=home|csr for public reads.
router.stack = router.stack.filter(
  (layer) => !(layer.route && layer.route.path === "/" && layer.route.methods.get),
);
router.get("/", controller.listPublicByGroup);

module.exports = router;
