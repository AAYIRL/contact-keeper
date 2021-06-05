const express = require("express");

const router = express.Router();

//@route     GET api/contacts
//@desc      Get all contacts of a user
//@access    Private

router.get("/", (req, res) => {
  res.send("Get all contacts of a user");
});

//@route     POST api/contacts
//@desc      Add new contact
//@access    Private

router.post("/", (req, res) => {
  res.send("Add new contact");
});

//@route     PUT api/contacts/:id
//@desc      Update contacts
//@access    Private

router.put("/:id", (req, res) => {
  res.send("Update Contact");
});

//@route     DELETE api/contacts/:id
//@desc      Delete Contacts
//@access    Private

router.delete("/:id", (req, res) => {
  res.send("Delete contacts");
});

module.exports = router;
