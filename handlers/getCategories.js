const { Field } = require("../db/services");

async function getCategories(req, res) {
  const data = new Field("Categories");
  const category = await data.getAll();
  res.json(category);
}

module.exports = getCategories;
