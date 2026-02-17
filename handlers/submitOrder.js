const { Field } = require("../db/services");
const { sendErrorResponse } = require("../libs/errorHandler");
const { responseSuccess } = require("../libs/successHandler");

async function checkingStockItem(id) {
  const dbase = new Field("Products");
  const result = await dbase.getOne("_id", id);
  if (result && result.quantity > 1) {
    return true;
  }
  return false;
}

async function submitOrder(req, res) {
  const orderData = req.body;

  if (!orderData || !orderData.products || !Array.isArray(orderData.products)) {
    sendErrorResponse(res, "Missing required field: products (array)", 400);
    return;
  }

  const dbase = new Field("Orders");
  const emptyStock = [];

  for (const val of orderData.products) {
    const inStock = await checkingStockItem(val.id);
    if (!inStock) {
      emptyStock.push(val);
    }
  }

  orderData.created_date = new Date();

  try {
    await dbase.insert(orderData);
  } catch (err) {
    sendErrorResponse(res, "Failed to submit order", 500);
    return;
  }

  if (emptyStock.length > 0) {
    res.json({ warning: "Some items are out of stock", out_of_stock: emptyStock, order: orderData });
  } else {
    res.json(responseSuccess(orderData));
  }
}

module.exports = submitOrder;
