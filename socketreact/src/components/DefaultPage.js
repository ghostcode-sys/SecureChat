import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const DefaultPage = ({setIsAuth}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const myInfo = window.localStorage.getItem("myinfo");
    if (myInfo) {
      setIsAuth(true);
      navigate("home");
    }
  }, []);

  return <div></div>;
};

export default DefaultPage;
