const { sendErrorResponse } = require("../libs/errorHandler");

// Authorization middleware - currently commented out (matching Go version)
// function authorization(req, res, next) {
//   const header = req.headers["umx"];
//   if (header !== "tokenisasi") {
//     sendErrorResponse(res, "", 401);
//     return;
//   }
//   next();
// }

module.exports = {};
