import { createContext } from "react";

import  io  from "socket.io-client";

export const socket = io("http://localhost:8000")

const SocketContext = createContext(socket)

export default SocketContext