const { Field } = require("../db/services");
const { sendErrorResponse } = require("../libs/errorHandler");

async function getStatusOrder(req, res) {
  const id = req.body;
  if (!id) {
    sendErrorResponse(res, "Not Found", 405);
    return;
  }

  const newCollection = new Field("Testing");
  const result = await newCollection.getMany("id", id);

  if (result.length > 0) {
    res.json(result);
  } else {
    sendErrorResponse(res, "Not Found", 405);
  }
}

module.exports = getStatusOrder;
