const jwt = require('jsonwebtoken');

// const secretKey = process.env.SECRET_KEY;
const secretKey = "hahaha";

const generateToken = (userId, userRole) => {
  const payload = {
    id: userId,
    role: userRole,
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: '2h' });

  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null
  }
};

module.exports = { generateToken, verifyToken };
