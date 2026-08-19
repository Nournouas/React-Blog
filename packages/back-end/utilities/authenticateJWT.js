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
        next()
      }
    });
  }else {
    return res.send("no JWT Token Found to authenticate")
  }
}

module.exports = authenticateToken;