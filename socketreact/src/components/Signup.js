import axios from 'axios';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { SIGNUP } from './utils';

const Signup = ({setIsAuth}) => {
    const [user, setUser] = useState({
        name:"",
        username:"",
        password: ""
    })

    const navigate = useNavigate();

    const handleInput = (e) => {
        e.preventDefault();
        setUser({...user, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
       try {
           e.preventDefault();
            const res = await axios.post(SIGNUP, {...user});
            if(res.data && res.status === 200){
                window.localStorage.setItem("myInfo", JSON.stringify({...res.data}))
               setIsAuth(true);
               navigate("/home")
            }
            else{
                window.alert("Username already Exists\n try another username")
            }
            
        } catch (error) {
            window.alert("Username already Exists\n try another username")
       }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='name'>Name</label>
                <input type="text" name="name" value={user.name} onChange={handleInput} placeholder="Name"/>
            </div>
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

export default Signup