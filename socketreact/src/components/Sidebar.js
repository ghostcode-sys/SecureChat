
import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Sidebar = ({allFriends, fromSidebar}) => {
  
  const [allCards, setAllCards] = useState([])
  
  const handelSideBar = (index) => {
    fromSidebar(index);
  }

  useEffect(() => {
    const arr = allFriends.map((value, index) => {
      return <UserCard name={value.name} key={value.username} index={index} fromSidebar={handelSideBar}/>
    })
    setAllCards([...arr])
    if(allFriends.length !== 0){
      fromSidebar(0)
    }
  }, [allFriends])
  

  return <div className="w-1/6 bg-white h-full border-2 border-black-400">{allCards}</div>;
};

export default Sidebar;
