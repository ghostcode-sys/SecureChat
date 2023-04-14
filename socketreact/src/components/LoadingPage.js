import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingPage = ({setIsAuth}) => {
    const navigate = useNavigate()

    useEffect(() => {
      const myinfo = window.localStorage.getItem("myinfo")
      const timeOut = setTimeout(() => {
        if(myinfo){
          setIsAuth(true);
          navigate("home")
        }
        else{
          navigate("login")
        }
      }, 3000)
      return () => {
        clearTimeout(timeOut)
      }
    }, [])
    
  return (
    <div className="flex justify-center items-center h-full">
      <div className="backdrop-blur-md bg-white/30 w-4/6 h-4/6 flex items-center justify-center">
        <p className="text-5xl font-bold ">Welcome To Secure Chats</p>
      </div>
    </div>
  );
};

export default LoadingPage;
