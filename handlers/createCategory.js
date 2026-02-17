const { Field } = require("../db/services");
const { sendErrorResponse } = require("../libs/errorHandler");
const { responseSuccess } = require("../libs/successHandler");

async function createCategory(req, res) {
  const category = req.body;

  if (!category || !category.name) {
    sendErrorResponse(res, "Missing required field: name", 400);
    return;
  }

  category.created_date = new Date();
  const cat = new Field("Categories");
  try {
    await cat.insert(category);
    res.json(responseSuccess(category));
  } catch (err) {
    sendErrorResponse(res, "Failed to create category", 500);
  }
}

module.exports = createCategory;
