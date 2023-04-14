import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGIN } from './utils';

const Login = ({setIsAuth}) => {

    const [user, setUser] = useState({
        username:"",
        password: ""
    })

    const navigate = useNavigate();

    const handleInput = (e) => {
        e.preventDefault();
        setUser({...user, [e.target.name]: e.target.value})
    }
    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            const res =await axios.post(LOGIN, {...user})
    
            if(res.data && res.status === 200){
                window.localStorage.setItem("myinfo", JSON.stringify({...res.data}));
                setIsAuth(true);
                navigate("/home")
            }
            else{
                window.alert("Wrong Information")
            }
        } catch (error) {
            window.alert("Wrong Information")
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='username'>Username</label>
                <input type="text" name="username" value={user.username} onChange={handleInput} placeholder="Username"/>
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input type="password" name="password" value={user.password} onChange={handleInput} placeholder="Password"/>
            </div>
            <div>
                <input type="submit" />
            </div>
        </form>
    </div>
  )
}

export default Login