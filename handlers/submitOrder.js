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
  if (!orderData) {
    sendErrorResponse(res, "", 403);
    return;
  }

  const dbase = new Field("Testing");
  const emptyStock = [];

  if (orderData.products) {
    for (const val of orderData.products) {
      const inStock = await checkingStockItem(val.id);
      if (!inStock) {
        emptyStock.push(val);
      }
    }
  }

  try {
    await dbase.insert(orderData);
  } catch (err) {
    sendErrorResponse(res, "", 403);
    return;
  }

  if (emptyStock.length > 0) {
    res.json(emptyStock);
  } else {
    res.json(responseSuccess(orderData));
  }
}

module.exports = submitOrder;
