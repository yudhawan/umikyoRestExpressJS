const { Field } = require("../db/services");
const { sendErrorResponse } = require("../libs/errorHandler");
const { responseSuccess } = require("../libs/successHandler");

async function createCategory(req, res) {
  const category = req.body;
  if (!category) {
    sendErrorResponse(res, "Error decode category", 400);
    return;
  }

  category.created_date = new Date();
  const cat = new Field("Testing");
  try {
    await cat.insert(category);
    res.json(responseSuccess(category));
  } catch (err) {
    sendErrorResponse(res, "Cannot created data category to database", 405);
  }
}

module.exports = createCategory;
