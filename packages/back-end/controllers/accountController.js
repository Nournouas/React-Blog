require("dotenv").config();
const { findAuthorById,
        createUser,
        findUserByEmail } = require("../utilities/queries");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticateTokenExt }  = require("../utilities/authenticateJWT");

const signUp = async ( req, res ) => {
  res.cookie('jwt', '', {maxAge: 1});
  const { email, password, name } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ errors: [{msg: "Email Already In Use! Login In Instead"}] })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const tarot =  Math.floor(Math.random() * (12 - 1 + 1)) + 1;
    const newUser = await createUser(email, hashedPassword, name, tarot);
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
      return res.status(400).json({ errors: [{msg: "User Not Found"}] })
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ errors: [{msg: "Invalid email or password"}] })
    }
    token = jwt.sign({id: existingUser.id, email: existingUser.email, name: existingUser.name, tarot: existingUser.tarot}, process.env.JWT_ACCESS_TOKEN, {expiresIn: "3h"});
    res.cookie('jwt', token, {httpOnly : true, secure: true});
    return res.send(JSON.stringify(token));
  
  }catch(err) {
    console.error(err);
    return res.status(500).send(err);
  };
};

const logout = async ( req, res ) => {
  try{
    res.cookie('jwt', '', {maxAge: 1});
    res.send(JSON.stringify(true));
  }catch(err){
    console.error(err);
    return res.status(500).send(err);
  }
  
}

const details = async (req, res) => {
  try{
    const token = req.headers["authorization"]
    const auth = authenticateTokenExt(token);
    if ( auth === true) {
      const userDetails = (jwt.verify(token, process.env.JWT_ACCESS_TOKEN));
      return res.send(JSON.stringify(userDetails));
    }else{
      return res.send(JSON.stringify("LOGIN"))
    }
  }catch(err){
    console.error(err);
    return res.status(500).send(err);
  }
}

const authorDetails = async (req, res) => {
  try{
    const token = req.headers["authorization"]
    const auth = authenticateTokenExt(token);
    if ( auth === true) {
      const authorId = parseInt(req.params.authorId);
      const authorDetails = await findAuthorById(authorId);
      return res.send(JSON.stringify(authorDetails));
    }else{
      return res.send(JSON.stringify("LOGIN"))
    }
  }catch(err){
    console.error(err);
    return res.status(500).send(err);
  }
}

module.exports = {
  signUp,
  login,
  logout,
  details,
  authorDetails
};
