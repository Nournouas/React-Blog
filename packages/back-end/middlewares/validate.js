const express = require("express");
const { check, validationResult } = require("express-validator");

const validateSignup = [
  check('email')
    .trim()
    .normalizeEmail()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email address")
    .isLength({ max: 254 }).withMessage("Email is too long"),

  check('name')
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s'-]+$/).withMessage("Name contains invalid characters")
    .escape(), // sanitize against XSS if you ever render it raw

  check('password')
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8, max: 128 }).withMessage("Password must be at least 8 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]

const validateCreateForm = [

  check('body')
    .trim()
    .notEmpty().withMessage("Body is required")
    .isLength({ min: 50 }).withMessage("Your writings are too short")
    .escape(),

    check('title')
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 2, max: 200 }).withMessage("Your Title are too short"),

  (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      console.log("hi")
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]

const validateLogin = [
  check('email')
    .trim()
    .normalizeEmail()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email address")
    .isLength({ max: 254 }).withMessage("Email is too long"),

  check('password')
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8, max: 128 }).withMessage("Password must be at least 8 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]


module.exports = {
  validateSignup,
  validateLogin,
  validateCreateForm
}