const joinRoomSocket = (room, socket)=>{
    console.log(room)
    socket.join(room.username)
}

const SendMsgToClient = (data, socket) => {
    socket.to(data.room).emit("msg-from-server", data);
}

module.exports = {joinRoomSocket, SendMsgToClient}