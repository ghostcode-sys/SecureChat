import { useRef } from "react";
import DisplayMsg from "./DisplayMsg";
import { useEffect } from "react";

const Message = ({ name, msgs }) => {

  const scrollToBottom = useRef(null)

  const handleScroll = () => {
    scrollToBottom.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    handleScroll();
  }, [msgs])
  

  return (
    <div className="h-5/6">
      <p className="text-2xl font-bold text-blue-500">{name}</p>
      <div className="overflow-auto h-4/5 mt-4">
        {msgs.map((value, index) => {
          return <DisplayMsg side={value.side} msg={value.msg} key={index} />;
        })}
        <div ref={scrollToBottom}></div>
      </div>
    </div>
  );
};

export default Message;
