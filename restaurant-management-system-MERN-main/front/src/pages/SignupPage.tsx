import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/signup.css";

export default function SignupPage() {
    const navigate = useNavigate();
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmpass, setConfrimPass] = useState();

  const getName = (e: any) => {
    let valuePass = e.target.value;
    setName(valuePass);

    console.log("works");
  };

  const getUserName = (e: any) => {
    let valuePass = e.target.value;
    setUsername(valuePass);
  };

  const getPassword = (e: any) => {
    let valuePass = e.target.value;
    setPassword(valuePass);
  };

  const getConfirmPassword = (e: any) => {
    let valuePass = e.target.value;
    setConfrimPass(valuePass);
  };

  const handleSignupButton = async  (e:any) =>{
    e.preventDefault();

    try{

        if (name === "" || username === "" || password === "" || confirmpass ===""){
          alert("Please enter username and password")
          // props.setValid(true);
          return;
        }

        let uri = "http://localhost:8000/user/signup"
        let data = {name: name , username: username , password: password} 
        const response = await axios.post(uri, data)
       
        console.log("response", response.data)

        // changeUser(response.data.user)
        alert(response.data.message)
        navigate('/user/home')
        // changeUser({username})

      } 
      catch (error:any){
        // console.log(error.response.data);
        alert(error.response.data.error)
      }

  } 

  return (
    <>
      <div className="container-signup">
        <form className="login-form">
          <h2>Signup</h2>

          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter your full name"
              value={name}
              onChange={getName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={getUserName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={getPassword}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Re-enter your password"
              value={confirmpass}
              onChange={getConfirmPassword}
            />
          </div>
          <div className="form-group">
            <button type="submit" onClick={handleSignupButton}>Sign Up</button>
          </div>
          <div className="form-group signup-link">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </form>
      </div>
    </>
  );
}
