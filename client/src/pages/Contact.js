import React from "react";
import { Link } from "react-router-dom";
 

const About = () => {
    return (
        <div>
          <nav className="navbar sticky-top">
            <div className="container flex">
              <a href="/"><img width="40" length="auto" src={process.env.PUBLIC_URL + '/ncsulogo.png'} alt="NCSU Logo"/></a>
              <div className="nav justify-content-end">
                <Link className="navlink" to="/">Home</Link>
                <Link className="navlink" to="/about">About</Link>
                <Link className="navlink" to="/contact">Contact</Link>         
                <Link className="navlink" to="/detector">Detector</Link>
              </div>
            </div>
          </nav>
            <div className="container">
              <h1 className="header">Contact</h1>
              <p>In Progess ...</p>
            </div>
        </div>
    );
};
 
export default About;