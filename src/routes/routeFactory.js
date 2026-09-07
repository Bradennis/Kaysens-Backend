const express = require("express");
const { protect, requireRole } = require("../middleware/auth");

// Builds a router exposing:
//   GET    /            (public list)
//   GET    /admin        (admin list, protected)
//   GET    /:slug        (public detail by slug) — only if hasSlug is true
//   GET    /id/:id        (admin detail by id, protected)
//   POST   /             (create, protected)
//   PUT    /:id          (update, protected)
//   DELETE /:id          (delete, protected)
//   PUT    /reorder/all  (reorder, protected)
function buildRouter(controller, { hasSlug = true, allowedRoles = ["admin", "editor"] } = {}) {
  const router = express.Router();

  router.get("/", controller.listPublic);
  router.get("/admin", protect, requireRole(...allowedRoles), controller.listAdmin);
  router.put("/reorder/all", protect, requireRole(...allowedRoles), controller.reorder);
  router.get("/id/:id", protect, requireRole(...allowedRoles), controller.getOneById);

  if (hasSlug) {
    router.get("/:slug", controller.getOneBySlug);
  }

  router.post("/", protect, requireRole(...allowedRoles), controller.create);
  router.put("/:id", protect, requireRole(...allowedRoles), controller.update);
  router.delete("/:id", protect, requireRole(...allowedRoles), controller.remove);

  return router;
}

module.exports = buildRouter;
