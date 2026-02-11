const bcrypt = require("bcryptjs");
const { Field } = require("../db/services");
const { sendErrorResponse } = require("../libs/errorHandler");

async function userLogin(req, res) {
  console.log("Login Terrr");
  const userBody = req.body;
  const userField = new Field("Users");
  console.log(`Data : ${JSON.stringify(userBody)}`);
  const row = await userField.getOne("email", userBody.email);

  if (row) {
    try {
      const match = await bcrypt.compare(userBody.password, row.password);
      if (match) {
        const token = "tokeeeen";
        const userAuthenticated = { user_data: row, token: token };
        res.json(userAuthenticated);
        return;
      }
    } catch (err) {
      // bcrypt comparison failed
    }
  }

  sendErrorResponse(res, "Authentication Failed", 500);
}

module.exports = userLogin;
