const { Field } = require("../db/services");
const { sendErrorResponse } = require("../libs/errorHandler");

async function getStatusOrder(req, res) {
  const id = req.query.id;
  if (!id) {
    sendErrorResponse(res, "Missing required query parameter: id", 400);
    return;
  }

  const orderCollection = new Field("Orders");
  const result = await orderCollection.getMany("id", id);

  if (result.length > 0) {
    res.json(result);
  } else {
    sendErrorResponse(res, "Order not found", 404);
  }
}

module.exports = getStatusOrder;
