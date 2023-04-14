import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoadingPage from "./components/LoadingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DefaultPage from "./components/DefaultPage";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <div className="w-full h-screen">
      <Routes>
        <Route path="/" element={<LoadingPage setIsAuth={setIsAuth} />} />
        <Route path="login" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="signup" element={<Signup setIsAuth={setIsAuth} />} />
        {isAuth && <Route path="/home" element={<Home />} />}
        <Route path="*" element={<DefaultPage setIsAuth={setIsAuth} />}/>
      </Routes>
    </div>
  );
}

export default App;
