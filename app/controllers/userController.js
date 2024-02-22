const { validationResult } = require("express-validator");
const _ = require("lodash");
const Users = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userCtrl = {};

const secretKey = process.env.SECRET_KEY || "secretIngreidents";

userCtrl.login = async (req, res) => {
  const errors = validationResult(req);
  // check if the request body has error
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // sanitization of request body
  const body = _.pick(req.body, ["email", "password"]);
  try {
    // finding the existing user
    const user = await Users.findOne({ email: body.email });
    if (user) {
      // password verification
      const verifiedPassword = await bcrypt.compare(body.password, user.password);
      if (!verifiedPassword) {
        return res.status(404).json({ errors: [{ msg: "Invalid email / password." }] });
      } else {
        // generating user token
        const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, {
          expiresIn: "7d",
        });
        res.json({
          token: `Bearer ${token}`,
          userId: user._id,
          role: user.role,
        });
      }
    } else {
      return res.status(404).json({ errors: [{ msg: "Invalid email / password." }] });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

userCtrl.register = async (req, res) => {
  // check if the request body has error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // sanitization of request body
  const body = _.pick(req.body, ["name", "email", "password"]);
  try {
    const user = new Users(body);
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);
    user.password = hashedPassword;
    const totalUser = await Users.countDocuments();
    if (totalUser == 0) {
      user.role = "admin";
    }
    const newUser = await user.save();
    res.json(newUser);
  } catch (error) {
    res.status(400).json(errors);
  }
};

module.exports = userCtrl;
