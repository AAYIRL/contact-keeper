const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const router = express.Router();

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({ msg: "Email already exists" });
      }

      user = new User({
        email: email,
        name: name,
        password: password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send("passed");
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
