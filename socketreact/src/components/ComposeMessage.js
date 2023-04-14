import React, { useEffect, useState, useContext } from "react";
import AES from "crypto-js/aes";
import CardMessage from "./CardMessage";
import SocketContext from "../socket";

const ComposeMessage = ({ username, newMsg}) => {
 
  const socket = useContext(SocketContext)
 
  const [message, setMessage] = useState("");
  const [messageEncoded, setMessageEncoded] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [newPrivateKey, setNewPrivateKey] = useState("");
  const [loadPrompt, setLoadPrompt] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageEncoded(AES.encrypt(message, privateKey).toString());
    setLoadPrompt(true);
  };

  const changeKey = (e) => {
    setNewPrivateKey(e.target.value);
  };

  const addKeys = (e) => {
    const keyArr = JSON.parse(window.localStorage.getItem("privateKeys"));
    if (keyArr === null) {
      const arr = [{ username, key: newPrivateKey }];
      window.localStorage.setItem("privateKeys", JSON.stringify(arr));
    } else {
      const filterArr = keyArr.filter((value) => {
        if (value.username === username) return false;
        return true;
      });
      filterArr.push({ username, key: newPrivateKey });
      window.localStorage.setItem("privateKeys", JSON.stringify(filterArr));
    }
    setPrivateKey(newPrivateKey);
    setNewPrivateKey("");
  };

  useEffect(() => {
    const arr = JSON.parse(window.localStorage.getItem("privateKeys"));
    if(arr){
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].username === username) {
          setPrivateKey(arr[i].key);
          break;
        }
      }
    }
  }, [username]);

  const cardResponse = (imgInfo) => {
    socket.emit("msg-to-server", {room: username,  msg: imgInfo.name, sender: JSON.parse(window.localStorage.getItem("myinfo")).username})
    const msg = window.localStorage.getItem(username);
    if(msg){
      const msgArr = JSON.parse(msg);
      msgArr.push({side:"right", msg: message});
      window.localStorage.setItem(username, JSON.stringify(msgArr));
    }
    else{
      const msgArr = [];
      msgArr.push({side:"right", msg: message});
      window.localStorage.setItem(username, JSON.stringify(msgArr));
    }
    newMsg(message);
    setMessage("")
    setLoadPrompt(false);
  }

  return (
    <div className="border-t-2 border-red-400 h-1/6 py-3">
      {loadPrompt && <CardMessage msg={messageEncoded} hideCard={cardResponse}/>}
      <form className="w-full flex justify-between">
        <textarea
          placeholder="Message"
          row={3}
          className="w-5/6 resize-none border-2 border-black p-2"
          value={message}
          onChange={handleChange}
        />
        <button
          className="px-4 w-16 h-16 mr-4 rounded-full border-2 bg-lime-300"
          onClick={handleSubmit}
        >
          <img src="https://img.icons8.com/android/24/null/paper-plane.png" />
        </button>
      </form>
      {privateKey === "" ? (
        <div>
          <input
            type="text"
            value={newPrivateKey}
            onChange={changeKey}
            placeholder="Private key"
          />
          <input type="button" onClick={addKeys} value="Add key" />
        </div>
      ) : (
        <div>
          <span>Key: {privateKey} </span>
          <button onClick={() => setPrivateKey("")}>Change key</button>
        </div>
      )}

    </div>
  );
};

export default ComposeMessage;
