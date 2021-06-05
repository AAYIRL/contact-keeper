const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const User = require("../models/User");

// @route    api/users
//@desc      Register a user
//@access    public

router.post(
  "/",
  [
    check("name", "Please Add a name").not().isEmpty(),
    check(
      "password",
      "Please Enter a password of minimum 6 characters"
    ).isLength({ min: 6 }),
    check("email", "Please enter a valid email").isEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("passed");
  }
);

module.exports = router;
