const jwt = require("jsonwebtoken");
const { sendErrorResponse } = require("../libs/errorHandler");

function authorization(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    sendErrorResponse(res, "Authorization token required", 401);
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY_TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
    sendErrorResponse(res, "Invalid or expired token", 401);
  }
}

module.exports = { authorization };
