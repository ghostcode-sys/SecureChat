// import of global modules
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// userSchema import
const userModel = require("../models/user");

const route = express.Router();

// route for signup

route.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    body.username = body.username.toLowerCase();

    // checkig if user exits
    const isUserExists = await userModel.findOne({ username: body.username });

    // if user not exit then create a new user
    if (!isUserExists) {
      // user schema
      const newUser = userModel({ ...body });
      const savedUser = await newUser.save();
      if (savedUser) {
        // creating token for user to save
        const token = jwt.sign(savedUser.username, process.env.JWTKEY);
        res
          .status(200)
          .json({ token, name: savedUser.name, username: savedUser.username });
      }
    } else {
      res.status(400).send("User Already Exits");
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

// login route

route.post("/login", async (req, res) => {
  try {
    const body = req.body;
    body.username = body.username.toLowerCase();

    // checkig if user exits
    const isUserExists = await userModel.findOne({ username: body.username });

    // if user exits
    if (isUserExists) {
      const isPasswordCorrect = await bcrypt.compare(
        body.password,
        isUserExists.password
      );

      if (isPasswordCorrect) {
        const token = jwt.sign(isUserExists.username, process.env.JWTKEY);
        res
          .status(200)
          .json({
            token,
            name: isUserExists.name,
            username: isUserExists.username,
          });
      } else {
        res.status(400).send("User does not exits");
      }
    } else {
      res.status(400).send("User does not exits");
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = route;
