import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "./utils";

const Login = ({ setIsAuth }) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(LOGIN, { ...user });

      if (res.data && res.status === 200) {
        window.localStorage.setItem("myinfo", JSON.stringify({ ...res.data }));
        setIsAuth(true);
        navigate("/home");
      } else {
        window.alert("Wrong Information");
      }
    } catch (error) {
      window.alert("Wrong Information");
    }
  };
  return (
    <div className="block bg-white h-3/5 m-7 text-center">
      <h1 className="font-bold text-7xl text-teal-500">LOGIN</h1>
      <form
        onSubmit={handleSubmit}
        className="block w-4/5 rounded shadow-2xl m-auto my-5 p-7"
      >
        <div className="flex flex-col items-start p-4">
          <label
            htmlFor="username"
            className="font-bold text-xl w-full text-left"
          >
            USERNAME
          </label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInput}
            placeholder="Username"
            className="w-full p-2 font-bold text-lg my-3 outline-none border-b-4 hover:border-blue-500 focus:border-blue-500 "
          />
        </div>
        <div className="flex flex-col items-start p-4">
          <label
            htmlFor="password"
            className="font-bold text-xl w-full text-left"
          >
            PASSWORD
          </label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInput}
            placeholder="Password"
            className="w-full p-2 font-bold text-lg my-3 outline-none border-b-4 hover:border-blue-500 focus:border-blue-500 "
          />
        </div>
        <div>
          <input
            type="submit"
            className="p-2 font-bold text-lg hover:cursor-pointer bg-slate-400 hover:bg-blue-500 rounded hover:text-white "
          />
        </div>
      </form>
      <Link to="/signup">
        <span className="hover:text-teal-500 font-bold">
          Dont have Account Signup
        </span>
      </Link>
    </div>
  );
};

export default Login;
