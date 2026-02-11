const { Field } = require("../db/services");
const { sendErrorResponse } = require("../libs/errorHandler");
const { responseSuccess } = require("../libs/successHandler");

async function createProduct(req, res) {
  const product = req.body;
  if (!product) {
    sendErrorResponse(res, "Error decode product", 400);
    return;
  }

  console.log(JSON.stringify(product));

  product.created_date = new Date();
  const obj = new Field("Testing");
  try {
    await obj.insert(product);
    res.json(responseSuccess(product));
  } catch (err) {
    sendErrorResponse(res, "Failed to add Data", 405);
  }
}

module.exports = createProduct;
