import React, { useEffect } from "react";
import { Link } from "react-router-dom";
const DefaultPage = ({ setIsAuth }) => {

  useEffect(() => {
    const myInfo = window.localStorage.getItem("myinfo");
    if (myInfo) {
      // setIsAuth(true);
      // navigate("home");
    }
  }, []);

  return (
    <div className="block w-3/5 m-auto mt-10 text-center shadow-xl shadow-zinc-950 rounded py-7">
      <p className="font-bold text-9xl text-orange-500">Error 404</p>
      <div className="block w-full my-5">
        <Link to="/login"><span className="font-bold text-xl hover:text-blue-400">Already Have an Account? Login</span></Link>
      </div>
      <div className="block w-full">
        <Link to="/signup"><span className="font-bold text-xl hover:text-blue-400">Have No Account? Signup</span></Link>
      </div>
    </div>
  );
};

export default DefaultPage;
