const { Field } = require("../db/services");
const { sendErrorResponse } = require("../libs/errorHandler");

async function getUsers(req, res) {
  const data = new Field("Users");
  const users = await data.getAll();

  const sanitizedUsers = users.map(({ password, ...user }) => user);

  const response = {
    length: sanitizedUsers.length,
    page: 1,
    offset: 0,
    users: sanitizedUsers,
  };

  try {
    res.json(response);
  } catch (err) {
    sendErrorResponse(res, "Error when encoding response", 500);
  }
}

module.exports = getUsers;
