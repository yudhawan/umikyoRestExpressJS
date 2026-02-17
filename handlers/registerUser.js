const bcrypt = require("bcryptjs");
const { Field } = require("../db/services");
const { sendErrorResponse } = require("../libs/errorHandler");
const { generateToken } = require("../libs/tokenHandler");

async function registerUser(req, res) {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    sendErrorResponse(res, "Missing required fields: email, password, name", 400);
    return;
  }

  const userField = new Field("Users");

  const existing = await userField.getOne("email", email);
  if (existing) {
    sendErrorResponse(res, "Email already registered", 409);
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = {
    email,
    password: hashedPassword,
    name,
    status: "active",
    created_date: new Date(),
  };

  try {
    await userField.insert(user);
    const token = generateToken(email);
    const { password: _, ...userData } = user;
    res.status(201).json({ user_data: userData, token });
  } catch (err) {
    sendErrorResponse(res, "Failed to register user", 500);
  }
}

module.exports = registerUser;
