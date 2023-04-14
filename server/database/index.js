const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/securechat");

const conn = mongoose.connection;

conn.on("error", console.error.bind(console, "connection error"));

conn.once("open", function () {
  console.log("connected to database with securechat");
});
