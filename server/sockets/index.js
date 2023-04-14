// socket imports
const {joinRoomSocket, SendMsgToClient} = require("./chatsocket")

// start of main socket function
const socketFunctions = (socket) => {
    console.log("connected to serversocket", socket.id)

    // join room 
    socket.on("join-room", (room) => joinRoomSocket(room, socket))

    socket.on("msg-to-server", (data)=> SendMsgToClient(data, socket))

};
// end of socket function
// **-------------------------------------------------------**

// export of module
module.exports = socketFunctions;
