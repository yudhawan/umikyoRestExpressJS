function sendErrorResponse(res, message, statusCode) {
  res.status(statusCode).send(message);
}

function errorAuthorization(res) {
  res.status(401).json([
    { msg: "Authorization Failed", stat: "Cannot Reach Anything" },
  ]);
}

function errorAuthentication(text, res) {
  res.status(404).json(text);
}

module.exports = { sendErrorResponse, errorAuthorization, errorAuthentication };
