require("dotenv").config();
const express = require("express");
const accountRouter = express.Router();
const { createUser } = require("../utilities/queries");
const { logout,
        home,
        signUp,
        login } = require("../controllers/accountController")

accountRouter.post("/signup", signUp);
accountRouter.post("/login", login);
accountRouter.post("/logout", logout);
accountRouter.get("/home", home);

module.exports = {
  accountRouter
}
