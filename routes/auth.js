const express = require("express");

const router = express.Router();

//@route     GET api/auth
//@desc      Get logged in user
//@access    private

router.get("/", (req, res) => {
  res.send("Get Logged In User");
});

//@route     POST api/auths
//@desc      Auth User and get token
//@access    public

router.post("/", (req, res) => {
  res.send("Log in User");
});

module.exports = router;
