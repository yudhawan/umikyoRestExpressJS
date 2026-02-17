const jwt = require("jsonwebtoken");
const { Field } = require("../db/services");
const { sendErrorResponse } = require("../libs/errorHandler");

async function validationToken(req, res) {
  const { token } = req.body;
  if (!token) {
    sendErrorResponse(res, "Missing required field: token", 400);
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY_TOKEN);
    const dataCollection = new Field("Users");
    const result = await dataCollection.getOne("email", decoded.email);
    if (!result) {
      sendErrorResponse(res, "User not found", 404);
      return;
    }
    const { password, ...userData } = result;
    res.json({ valid: true, user: userData });
  } catch (err) {
    sendErrorResponse(res, "Invalid or expired token", 401);
  }
}

module.exports = validationToken;
