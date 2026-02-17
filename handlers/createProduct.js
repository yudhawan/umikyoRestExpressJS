const { Field } = require("../db/services");
const { sendErrorResponse } = require("../libs/errorHandler");
const { responseSuccess } = require("../libs/successHandler");

async function createProduct(req, res) {
  const product = req.body;

  if (!product || !product.name || product.price == null) {
    sendErrorResponse(res, "Missing required fields: name, price", 400);
    return;
  }

  product.created_date = new Date();
  const obj = new Field("Products");
  try {
    await obj.insert(product);
    res.json(responseSuccess(product));
  } catch (err) {
    sendErrorResponse(res, "Failed to add product", 500);
  }
}

module.exports = createProduct;
