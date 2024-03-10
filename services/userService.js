const { findUser, saveUser } = require("../db");
const errorTemplate = require("../templates/errorTemplate");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res, next) => {
  try {
    const user = await findUser({ email: req.body.email });

    if (user) {
      throw new Error("User Exists! Please try logging in.");
    } else {
      const newUser = Object.assign(new User(), req.body);
      newUser._id = new mongoose.Types.ObjectId();
      bcrypt.hash(newUser.password, 10, async function (err, hash) {
        if (err) {
          return res.status(501).json({ message: " Error: " + err.message });
        } else {
          newUser.password = hash;
          const { user: dbUser, error } = await saveUser(newUser);
          if (error) throw new Error("Failed to register!");
          res
            .status(201)
            .json({ message: " Successful Registration", user: dbUser });
        }
      });
    }
  } catch (err) {
    return errorTemplate(res, err, err.message);
  }
};
exports.loginUser = async (req, res, next) => {
  try {
    const user = await findUser({ email: req.body.email });

    if (!user) throw new Error("Authentication Failed: Unable to find user");
    const result = await bcrypt.compare(req.body.password, user.password);

    if (!result) throw new Error("Invalid Credentials");
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET
    );

    user.password = null;

    return res.status(201).json({
      message: "Log in successfull!",
      logged: true,
      user,
      token,
    });
  } catch (err) {
    return errorTemplate(res, err, err.message);
  }
};
