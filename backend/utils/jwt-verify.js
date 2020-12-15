const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/index');

const jwtVerify = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    return false;
  }
};

module.exports = jwtVerify;
