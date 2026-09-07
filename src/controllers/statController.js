const Stat = require("../models/Stat");
const createCrudController = require("./crudFactory");

const base = createCrudController(Stat, {
  defaultSort: { order: 1 },
  searchableFields: ["label"],
});

// Stats are grouped ("home" | "csr"), so the public listing supports ?group=
const asyncHandler = require("../utils/asyncHandler");
base.listPublicByGroup = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.group) filter.group = req.query.group;
  const items = await Stat.find(filter).sort({ order: 1 });
  res.json({ success: true, count: items.length, data: items });
});

module.exports = base;
