const bcrypt = require("bcryptjs");
const { Field } = require("../db/services");
const { sendErrorResponse } = require("../libs/errorHandler");
const { generateToken } = require("../libs/tokenHandler");

async function userLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    sendErrorResponse(res, "Missing required fields: email, password", 400);
    return;
  }

  const userField = new Field("Users");
  const row = await userField.getOne("email", email);

  if (row) {
    try {
      const match = await bcrypt.compare(password, row.password);
      if (match) {
        const token = generateToken(email);
        const { password: _, ...userData } = row;
        res.json({ user_data: userData, token });
        return;
      }
    } catch (err) {
      // bcrypt comparison failed
    }
  }

  sendErrorResponse(res, "Authentication Failed", 401);
}

module.exports = userLogin;
