import React from "react";

const UserCard = ({ name, index, fromSidebar }) => {
  const handleClick = () => {
    fromSidebar(index);
  };
  return (
    <button
      onClick={handleClick}
      className="w-full font-medium text-black border-2 py-1 text-left px-1 hover:bg-lime-200"
    >
      {name}
    </button>
  );
};

export default UserCard;
