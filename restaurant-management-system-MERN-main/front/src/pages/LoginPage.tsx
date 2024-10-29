import React, {useState} from 'react'
import '../css/login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../store/userSlice';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';


export default function LoginPage() {
    const {user, login} =useAuth();
    const navigate = useNavigate();
    const userState = useSelector((state: any) => state.user);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();


    // console.log(userState);
    const dispatch = useDispatch();

    const changeUser = (user:any) =>{
        //dispatch action 
        dispatch(set(user));   // action and payload in action 
    }

    const getUserName = (e: any) => {
        let valuePass = e.target.value;
        setUsername(valuePass);
        // console.log(username)
      };
    
      const getPassword = (e: any) => {
        let valuePass = e.target.value;
        setPassword(valuePass);
      };

    const handleLoginbutton = async(e:any) =>{
        e.preventDefault();
        // console.log('helo')
        try{

            if (username === "" || password === ""){
              alert("Please enter username and password")
              // props.setValid(true);
              return;
            }

            let uri = "http://localhost:8000/user/validate"
            let data = {username: username , password: password} 
            const response = await axios.post(uri, data)
            console.log("heloo")
            console.log("response", response.data.user)

            // changeUser(response.data.user)
            login(response.data.user)
            
            navigate('user/home')
            // changeUser({username})

          } 
          catch (error:any){
            // console.log(error.response.data);
            alert("Login failed please try again!")
          }
    }



  return (
    <>
    <div className="container-login">
        <form className="login-form">
            <h2>Login</h2>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Enter your username" value={username}  onChange={getUserName}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" value={password} onChange={getPassword} />
            </div>
            <div className="form-group">
                <button type="submit" onClick={handleLoginbutton}>Login</button>
            </div>
            <div className="form-group signup-link">
                Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
        </form>
    </div>
    </>
  )
}
