const jwt = require("jsonwebtoken");

function generateToken(email) {
  const secret = process.env.PRIVATE_KEY_TOKEN;
  const claims = {
    email: email,
  };
  try {
    const token = jwt.sign(claims, secret, { expiresIn: "30m" });
    return token;
  } catch (err) {
    console.log(`Error when creating token : ${err}`);
    return null;
  }
}

module.exports = { generateToken };
