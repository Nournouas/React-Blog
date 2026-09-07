require("dotenv").config();
const express = require("express");
const accountRouter = express.Router();
//const authenticateToken = require("../utilities/authenticateJWT");
const { logout,
        home,
        signUp,
        login,
        details,
        authorDetails } = require("../controllers/accountController");

const { validateSignup, validateLogin} = require("../middlewares/validate")

accountRouter.post("/signup", validateSignup, signUp);
accountRouter.post("/login", validateLogin, login);
accountRouter.get("/details", details);
accountRouter.get("/details/:authorId", authorDetails);
//accountRouter.use(authenticateToken);
accountRouter.post("/logout", logout);

module.exports = {
  accountRouter
}
