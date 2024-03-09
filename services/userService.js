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
      res.status(409).json({ message: "User exists, try logging in!" });
    } else {
      const newUser = Object.assign(new User(), req.body);
      newUser._id = new mongoose.Types.ObjectId();
      bcrypt.hash(newUser.password, 10, async function (err, hash) {
        if (err) {
          return res.status(501).json({ message: " Error: " + err.message });
        } else {
          newUser.password = hash;
          const { user: dbUser, error } = await saveUser(newUser);
          if (error) {
            return res
              .status(201)
              .json({ message: "Failed to register", error });
          }
          res
            .status(201)
            .json({ message: " Successful Registration", user: dbUser });
        }
      });
    }
  } catch (err) {
    return errorTemplate(res, err, "Error registering User");
  }
};
exports.loginUser = async (req, res, next) => {
  try {
    const user = await findUser({ email: req.body.email });

    if (!user) return errorTemplate(res, "", "User not Found");

    const result = await bcrypt.compare(req.body.password, user.password);

    if (!result) return errorTemplate(res, "", "Invalid Credentials");

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET
    );

    return res.status(201).json({
      message: "Log in successfull!",
      logged: true,
      user,
      token,
    });
  } catch (err) {
    return errorTemplate(res, err, "Failed to login");
  }
};
