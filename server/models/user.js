// global module imports
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// pre function that execute if password changes before saving files
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// creating model of userSchema
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
