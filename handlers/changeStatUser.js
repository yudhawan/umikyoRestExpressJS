const { Field } = require("../db/services");
const { sendErrorResponse } = require("../libs/errorHandler");

const VALID_STATUSES = ["active", "inactive", "suspended"];

async function changeStatUser(req, res) {
  const reqBody = req.body;
  if (!reqBody || !reqBody.id || !reqBody.status) {
    sendErrorResponse(res, "Missing required fields: id, status", 400);
    return;
  }

  if (!VALID_STATUSES.includes(reqBody.status)) {
    sendErrorResponse(res, `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`, 400);
    return;
  }

  const users = new Field("Users");
  try {
    const result = await users.update({ _id: reqBody.id }, { status: reqBody.status });
    res.json(result);
  } catch (err) {
    sendErrorResponse(res, "Failed to update user status", 500);
  }
}

module.exports = changeStatUser;
