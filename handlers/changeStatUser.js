const { Field } = require("../db/services");
const { sendErrorResponse } = require("../libs/errorHandler");

async function changeStatUser(req, res) {
  const reqBody = req.body;
  if (!reqBody || !reqBody.id || !reqBody.status) {
    sendErrorResponse(res, "Payload Doesnt Match", 500);
    return;
  }

  const users = new Field("Users");
  try {
    const result = await users.update({ _id: reqBody.id }, { status: reqBody.status });
    res.json(result);
  } catch (err) {
    sendErrorResponse(res, "Failed to update", 405);
  }
}

module.exports = changeStatUser;
