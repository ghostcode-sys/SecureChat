import { useContext, useEffect, useState } from "react";
import SocketContext from "../socket";

const Upperbar = () => {
  const socket = useContext(SocketContext);
  const [userInfo, setUserInfo] = useState({
    username: "",
    name: "",
  });
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("myinfo"));
    setUserInfo({ username: user.username, name: user.name });
    socket.emit("join-room", { username: user.username });
  }, [socket]);

  return (
    <div className="bg-white h-1/6 flex justify-between items-center border-2 border-orange-400">
        <div>
          <div className="text-black font-bold text-4xl py-3">Secure chats</div>
          <div className="text-black font-bold text-2xl py-2">
            Welcome {userInfo.name}
          </div>
        </div>
        <div className="p-4">
            <button className="rounded-md border-2 bg-slate-700 text-white font-medium text-xl p-2">Log out</button>
        </div>
    </div>
  );
};

export default Upperbar;
