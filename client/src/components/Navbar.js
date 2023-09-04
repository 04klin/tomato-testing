import React from "react";
import { Link } from "react-router-dom";
import '../css/Home.css';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {  

  const { logout } = useLogout()
  const { user } = useAuthContext();

  const handleClick = () => {
      logout()
  }


  return (
    <nav className="navbar sticky-top">
      <div className="container flex">
        <a href="/"><img width="40" length="auto" src={process.env.PUBLIC_URL + '/ncsulogo.png'} alt="NCSU Logo"/></a>
        <div className="nav justify-content-end">
          {user && (<span className="navlink" id="username">Logged in as '{user.username}'</span>)}          
          <Link className="navlink" to="/">Home</Link>
          <Link className="navlink" to="/about">About</Link>
          <Link className="navlink" to="/contact">Contact</Link>         
          <Link className="navlink" to="/detector">Detector</Link>
          
          {!user && (
            <div>
              <Link className="navlink" to="/login">Login</Link>
              {/** <Link className="navlink" to="/signup">Signup</Link> */}              
            </div>            
          )}

          {user && (
            <button onClick={handleClick} className="navlink" id="logout">Log Out</button>
          )}
          
        </div>
      </div>
      
    </nav>  
  )
  
}

export default Navbar