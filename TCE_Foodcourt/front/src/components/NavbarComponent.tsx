import React from 'react'
import '../css/navbar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function NavbarComponent() {
  // console.log("rendering navbar")
  const {user} = useAuth();
  return (
    <>
    <div>
      <ul className="container">
            <span className="sub-container">
            <Link to="/user/home" className="text-decoration-none"><li>Home</li></Link>
                <Link to="/user/menu" className="text-decoration-none"><li>Menu</li></Link>
                {user.role === "employee" && <Link to="/user/orders" className="text-decoration-none"><li>Orders</li></Link>}
            </span>
            <span className="sub-container"> 
                <Link to="/user/profile" className="text-decoration-none"><li>Profile</li></Link>
                <Link to="/" className="text-decoration-none"><li className="logout" >Logout</li></Link>
                {/* <Link to="/" className="text-decoration-none"><li>Login</li></Link>
                {user.role === "customer" && <Link to="/signup" className="text-decoration-none"><li>Sign Up</li></Link>} */}
            </span>
        </ul>
    </div>
    </>
  )
}
