require("dotenv").config();
const express = require("express");
const accountRouter = express.Router();
const authenticateToken = require("../utilities/authenticateJWT");
const { logout,
        home,
        signUp,
        login } = require("../controllers/accountController");


accountRouter.post("/signup", signUp);
accountRouter.post("/login", login);
accountRouter.use(authenticateToken);
accountRouter.post("/logout", logout);

module.exports = {
  accountRouter
}
