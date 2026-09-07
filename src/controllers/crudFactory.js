const slugify = require("slugify");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// These path segments are used by the admin routes themselves (see routeFactory.js),
// so a content slug can never be allowed to collide with them.
const RESERVED_SLUGS = new Set(["admin", "id", "reorder"]);

/**
 * Builds a standard set of CRUD handlers for a Mongoose model.
 *
 * options:
 *  - slugField: name of the field to auto-slugify from (e.g. "name" or "title")
 *  - defaultSort: sort spec used when none is given, e.g. { order: 1 }
 *  - publicFilter: extra filter merged in for public (non-admin) list/detail reads,
 *      e.g. { published: true }
 *  - searchableFields: fields checked against a `q` query param for admin search
 */
function createCrudController(Model, options = {}) {
  const { slugField, defaultSort = { order: 1, createdAt: -1 }, publicFilter = {}, searchableFields = [] } = options;

  async function ensureUniqueSlug(baseSlug, excludeId) {
    if (RESERVED_SLUGS.has(baseSlug)) {
      throw new ApiError(400, `"${baseSlug}" is a reserved slug and cannot be used — please choose another.`);
    }
    let slug = baseSlug;
    let counter = 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const query = { slug };
      if (excludeId) query._id = { $ne: excludeId };
      // eslint-disable-next-line no-await-in-loop
      const existing = await Model.findOne(query);
      if (!existing) return slug;
      counter += 1;
      slug = `${baseSlug}-${counter}`;
    }
  }

  const listPublic = asyncHandler(async (req, res) => {
    const items = await Model.find(publicFilter).sort(defaultSort);
    res.json({ success: true, count: items.length, data: items });
  });

  const listAdmin = asyncHandler(async (req, res) => {
    const filter = {};
    if (req.query.q && searchableFields.length) {
      filter.$or = searchableFields.map((field) => ({
        [field]: { $regex: req.query.q, $options: "i" },
      }));
    }
    const items = await Model.find(filter).sort(defaultSort);
    res.json({ success: true, count: items.length, data: items });
  });

  const getOneBySlug = asyncHandler(async (req, res) => {
    const filter = { slug: req.params.slug, ...publicFilter };
    const item = await Model.findOne(filter);
    if (!item) throw new ApiError(404, "Not found");
    res.json({ success: true, data: item });
  });

  const getOneById = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) throw new ApiError(404, "Not found");
    res.json({ success: true, data: item });
  });

  const create = asyncHandler(async (req, res) => {
    const body = { ...req.body };
    if (slugField && !body.slug && body[slugField]) {
      const base = slugify(body[slugField], { lower: true, strict: true });
      body.slug = await ensureUniqueSlug(base);
    } else if (body.slug) {
      body.slug = await ensureUniqueSlug(slugify(body.slug, { lower: true, strict: true }));
    }
    const item = await Model.create(body);
    res.status(201).json({ success: true, data: item });
  });

  const update = asyncHandler(async (req, res) => {
    const body = { ...req.body };
    if (body.slug) {
      body.slug = await ensureUniqueSlug(
        slugify(body.slug, { lower: true, strict: true }),
        req.params.id,
      );
    }
    const item = await Model.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!item) throw new ApiError(404, "Not found");
    res.json({ success: true, data: item });
  });

  const remove = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) throw new ApiError(404, "Not found");
    res.json({ success: true, data: {} });
  });

  const reorder = asyncHandler(async (req, res) => {
    const { order } = req.body; // array of { id, order }
    if (!Array.isArray(order)) throw new ApiError(400, "order must be an array of { id, order }");
    await Promise.all(
      order.map(({ id, order: pos }) => Model.findByIdAndUpdate(id, { order: pos })),
    );
    const items = await Model.find(publicFilter.published !== undefined ? {} : {}).sort(
      defaultSort,
    );
    res.json({ success: true, data: items });
  });

  return { listPublic, listAdmin, getOneBySlug, getOneById, create, update, remove, reorder };
}

module.exports = createCrudController;
