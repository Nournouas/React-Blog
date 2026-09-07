const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        return res.status(403).send(err.message);
      } else {
        console.log("JWT authentication successful");
        next()
      }
    });
  }else {
    return res.send("no JWT Token Found to authenticate")
  }
}

const authenticateTokenExt = (token) => {
  let auth;
  if (token) {
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        auth = false
        return false;
      } else {
        console.log("JWT authentication successful");
        auth = true
        return true;
      }
    });
  }else {
    auth = false;
    return false;
  }
  return auth;
}

module.exports = {
  authenticateToken,
  authenticateTokenExt
} 