import React, { useEffect, useState } from "react";
import './App.css';

function App() {

  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  return (
    <div>
      <nav class="navbar sticky-top">
        <div class="container flex">
          <a><img width="40" length="auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/North_Carolina_State_University_Athletic_logo.svg/800px-North_Carolina_State_University_Athletic_logo.svg.png"/></a>
          <ul class="nav justify-content-end">
            <li><a class="navlink" href="tabs/about.html">About</a></li>
            <li><a class="navlink" >Contact</a></li>
          </ul>
        </div>      
      </nav>

      <div class="example">
        <div class="container flex">
          <div>
            <h4>Sample</h4>
            <p>This sentence is here.</p>
          </div>
          <img style={{backgroundColor: 'gray', borderColor: 'gray', borderWidth: 10, width: 480, height: 180}} alt="Example image"/>
        </div>
      </div>      

      <div class="container section-detector-prompt">
        <h1 class="header">Detector</h1>
        <p>Upload a picture of the desired tomato crops below</p>
        
        <form>
          <input type="file" onChange={onImageChange}/>
        </form>
        
        
    
        <h4 class="small-header">Your results will be shown below</h4>
      </div>
      <div class="container flex">
        <img src={image} id="result" alt="Example image"/>
        
      </div>
    </div>
  );
}

export default App;
