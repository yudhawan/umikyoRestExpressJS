const { Field } = require("../db/services");
const { sendErrorResponse } = require("../libs/errorHandler");

async function validationToken(req, res) {
  const reqBody = req.body;
  if (!reqBody || !reqBody.token) {
    sendErrorResponse(res, "Payload Failed", 500);
    return;
  }

  const dataCollection = new Field("Users");
  const result = await dataCollection.getOne("token", reqBody.token);
  res.json(result);
}

module.exports = validationToken;
