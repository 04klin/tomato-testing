import React from "react";
import { Link } from "react-router-dom";
 

const NCSULogoPath ="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/North_Carolina_State_University_Athletic_logo.svg/800px-North_Carolina_State_University_Athletic_logo.svg.png";


const About = () => {
    return (
        <div>
          <nav className="navbar sticky-top">
            <div className="container flex">
              <a href="/"><img width="40" length="auto" src={NCSULogoPath} alt="NCSU Logo"/></a>
              <div className="nav justify-content-end">
                <Link className="navlink" to="/">Home</Link>
                <Link className="navlink" to="/about">About</Link>
                <Link className="navlink" to="/contact">Contact</Link>
              </div>
            </div>
          </nav>
            <div className="container">
              <h1>About</h1>
            </div>
        </div>
    );
};
 
export default About;