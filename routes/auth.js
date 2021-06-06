const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const router = express.Router();

const User = require("../models/User");

//@route     GET api/auth
//@desc      Get logged in user
//@access    private

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

//@route     POST api/auths
//@desc      Auth User and get token
//@access    public

router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password Required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      if (!user) {
        res.status(400).json({ msg: "Invalid Email" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({ msg: "Invalid Password" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
