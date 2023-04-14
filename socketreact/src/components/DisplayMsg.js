import React from "react";

const DisplayMsg = ({ side, msg }) => {
  return (
    <>
      {side === "left" ? (
        <div className="w-full">
          <div className="w-8/12 bg-red-400 border my-2 p-1 rounded">
            <p className="font-bold">{msg}</p>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-end">
          <div className="w-8/12 bg-neutral-300 border my-2 p-1 rounded">
            <p className="font-bold">{msg}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayMsg;
