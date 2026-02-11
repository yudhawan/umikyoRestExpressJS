const { Field } = require("../db/services");
const { sendErrorResponse } = require("../libs/errorHandler");

async function getUsers(req, res) {
  const data = new Field("Users");
  const users = await data.getAll();

  const response = {
    length: users.length,
    page: 1,
    offset: 0,
    users: users,
  };

  res.setHeader("Content-Type", "application/json");
  try {
    res.json(response);
  } catch (err) {
    sendErrorResponse(res, "Error when encoding response", 502);
  }
}

module.exports = getUsers;
