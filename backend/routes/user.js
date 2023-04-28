const express = require("express");
let router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Secret_Key = "Secret_Key";

router.post("/login", jsonParser, async (req, res) => {
  if (req.body.email == undefined) {
    return res.status(400).send("Invalid email");
  }
  var user = await User.findOne({ email: req.body.email });
  if (user == null) {
    res.json({
      status: false,
      message: "Email does not exist ",
    });
  } else {
    var matchPassword = await bcrypt.compare(req.body.password, user.password);
    if (!matchPassword) {
      return res.json({
        status: false,
        message: "Invalid credentials",
      });
    }
    var token = jwt.sign({ email: user.email, id: user._id }, Secret_Key);
    res.json({
      status: true,
      message: "Login Successful",
      data: {
        user: user,
        token: token,
      },
    });
  }
});
router.post("/signup", jsonParser, async (req, res) => {
  if (req.body.email == undefined) {
    return res.status(400).send("Invalid email");
  }
  if (req.body.password == undefined) {
    return res.status(400).send("Invalid password");
  }
  var exist = await User.findOne({ email: req.body.email });
  if (exist != null) {
    return res.json({
      status: false,
      message: "User already exists",
    });
  }
  var hashPassword = await bcrypt.hash(req.body.password, 10);
  var user = new User({
    email: req.body.email,
    password: hashPassword,
  });
  var newUser = await user.save();

  var token = jwt.sign({ email: newUser.email, id: newUser._id }, Secret_Key);
  res.json({
    status: true,
    message: "Account Created Successfully",
    data: {
      user: newUser,
      token: token,
    },
  });
});

module.exports = router;
