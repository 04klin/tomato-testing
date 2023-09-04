import React from "react";
import { Link } from "react-router-dom";
import '../css/Home.css';
 

const Navbar = () => {  
  return (
    <nav className="navbar sticky-top">
      <div className="container flex">
        <a href="/"><img width="40" length="auto" src={process.env.PUBLIC_URL + '/ncsulogo.png'} alt="NCSU Logo"/></a>
        <div className="nav justify-content-end">
          <Link className="navlink" to="/">Home</Link>
          <Link className="navlink" to="/about">About</Link>
          <Link className="navlink" to="/contact">Contact</Link>         
          <Link className="navlink" to="/detector">Detector</Link>
          <Link className="navlink" to="/login">Login</Link>
          <Link className="navlink" to="/signup">Signup</Link>
        </div>
      </div>
    </nav>  
  )
  
}

export default Navbar