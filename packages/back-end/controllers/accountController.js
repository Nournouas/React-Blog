require("dotenv").config();
const { createUser,
        findUserByEmail } = require("../utilities/queries");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const signUp = async ( req, res ) => {
  res.cookie('jwt', '', {maxAge: 1});
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
    return res.status(500).send(err);
  };
};

const login = async ( req, res ) => {
  res.cookie('jwt', '', {maxAge: 1});
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
    return res.status(500).send(err);
  };
};

const logout = async ( req, res ) => {
  try{
    res.cookie('jwt', '', {maxAge: 1});
    res.send("logout successful")
  }catch(err){
    console.error(err);
    return res.status(500).send(err);
  }
  
}

module.exports = {
  signUp,
  login,
  logout,
};
