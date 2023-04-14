// Globally imported files
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path")

// local file import
const socketFunctions = require("./sockets");
const user = require("./routes/user");
const imgLoad = require("./routes/imageUpload");
const allFriends = require("./routes/friends")

// database connection file to invoke connection
require("./database");

// dotenv to config env file information
dotenv.config();

// initializing the app
const app = express();

// removing cors problem to get all request from anywhere
app.use(cors({ origin: "*", methods: ["GET", "POST"] }));

// to accept json format data from forms
app.use(express.json());

//

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// io.listen(server);

// socket work
io.on("connection", socketFunctions);

// Port id
const port = process.env.PORT || 8000;

// user route
app.get("/", (req, res) => res.send("Hello brother"))
app.use("/user", user);
app.use("/imgLoad", imgLoad);
app.use("/friend", allFriends);
app.use("/static", express.static("public"))

// render files
server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
