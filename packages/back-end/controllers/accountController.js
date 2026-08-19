require("dotenv").config();
const { createUser,
        findUserByEmail } = require("../utilities/queries");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const signUp = async ( req, res ) => {
  const { email, password } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.send("Email Already Used");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await createUser(email, hashedPassword);
    return res.send(newUser);
  }catch(err) {
    console.error(err);
    res.redirect("/signup");
  };
};

const login = async ( req, res ) => {
  const { email, password } = req.body;
  try{
    const existingUser = await findUserByEmail(email);
    if (!existingUser){
      return res.send("User Not Found")
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.send("Invalid Email or Password")
    }
    token = jwt.sign({id: existingUser.id, email: existingUser.email}, process.env.JWT_ACCESS_TOKEN, {expiresIn: "3h"});
    res.cookie('jwt', token, {httpOnly : true, secure: true});
    return res.send("login successful")
  
  }catch(err) {
    console.error(err);
    return res.send("error try again")
  };
};

const logout = async ( req, res ) => {
  res.cookie('jwt', '', {maxAge: 1});
  res.send("logout successful")
}

const home = async (req, res) => {
  res.send("home page");
}

module.exports = {
  signUp,
  login,
  home,
  logout,
};
