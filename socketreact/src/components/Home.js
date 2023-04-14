import React, { useCallback, useEffect, useState } from "react";
import { ALLUSER } from "./utils";
import SocketContext, { socket } from "../socket";
import ChatRoom from "./ChatRoom";
import Sidebar from "./Sidebar";
import Upperbar from "./Upperbar";
import axios, { all } from "axios";
import sten from "./sten";
import CryptoJS, { AES } from "crypto-js";

const Home = () => {
  const [allFriends, setAllFriends] = useState([]);
  const [chats, setChats] = useState([]);
  const [imageSrc, setImageSrc] = useState("");
  const [key, setKey] = useState("");
  const [sender, setSender] = useState("");

  const handleSideBar = (index) => {
    if (index !== 0) {
      const arr1 = allFriends.slice(0, index);
      const arr2 = allFriends.slice(index + 1);
      const msg = window.localStorage.getItem(allFriends[index].username);
      if(msg){
        setChats(JSON.parse(msg));
      }
      else{
        setChats([])
      }
      setAllFriends([allFriends[index], ...arr1, ...arr2]);
    }
    else{
      const msg = window.localStorage.getItem(allFriends[index].username);
      if(msg){
        setChats(JSON.parse(msg));
      }
      else{
        setChats([])
      }
    }
  };

  const fetchAllUser = async () => {
    try {
      const res = await axios.get(ALLUSER);
      if (res.data && res.status === 200) {
        const myUsername = JSON.parse(window.localStorage.getItem("myinfo"));
        const arr = res.data.list.filter((value) => {
          if (myUsername.username !== value.username) {
            return true;
          }
          return false;
        });
        setAllFriends([...arr]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadChats = () => {
    const msgs = window.localStorage.getItem("secureChats");
    if (msgs) {
      setChats(JSON.parse(msgs));
    }
  };

  useEffect(() => {
    fetchAllUser();
    loadChats();
  }, []);

  const handleChats = useCallback((data) => {
    const url = `http://localhost:8000/static/${data.msg}`;
    setImageSrc(url);

    const keysArr = JSON.parse(window.localStorage.getItem("privateKeys"));
    for (let i = 0; i < keysArr.length; i++) {
      if (keysArr[i].username === data.sender) {
        setKey(keysArr[i].key);
        setSender(data.sender);
        break;
      }
    }
  }, []);

  const decodeMsgFromImage = () => {
    const im = document.getElementById("ComposedImg");
    const encodedMsg = sten.decode(im);
    const RealMsg = AES.decrypt(encodedMsg, key).toString(CryptoJS.enc.Utf8);
    const chatOfUser = window.localStorage.getItem(sender);
    if(chatOfUser){
      const chatArr = JSON.parse(chatOfUser);
      chatArr.push({side:"left", msg:RealMsg});
      setChats(chatArr)
      window.localStorage.setItem(sender, JSON.stringify(chatArr));
    }
    else{
      const chatArr = [];
      chatArr.push({side:"left", msg:RealMsg});
      setChats(chatArr)
      window.localStorage.setItem(sender, JSON.stringify(chatArr));
    }
  };

  useEffect(() => {
    socket.on("msg-from-server", handleChats);
  }, [socket, handleChats]);

  return (
    <SocketContext.Provider value={socket} className="h-full">
      <Upperbar />
      <div className="flex flex-row h-5/6">
        <Sidebar allFriends={allFriends} fromSidebar={handleSideBar} />
        <ChatRoom
          username={allFriends[0] ? allFriends[0].username : "None"}
          name={allFriends[0] ? allFriends[0].name : "None"}
          chats={chats}
        />
        {imageSrc && (
          <div>
            <img
              src={imageSrc}
              alt="encoded image"
              id="ComposedImg"
              onLoad={decodeMsgFromImage}
              crossOrigin="anonymous"
              className="hidden"
            />
            {/* <button onClick={decodeMsgFromImage} >Decode</button> */}
          </div>
        )}
      </div>
    </SocketContext.Provider>
  );
};

export default Home;
