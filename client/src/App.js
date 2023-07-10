import React, { useEffect, useState } from "react";
import './App.css';

function App() {

  const [image, setImage] = useState(null);

  //Updates the state and displays image
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }


  const NCSULogoPath ="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/North_Carolina_State_University_Athletic_logo.svg/800px-North_Carolina_State_University_Athletic_logo.svg.png";
  
  return (
    <div>
      <nav class="navbar sticky-top">
        <div class="container flex">
          <a><img width="40" length="auto" src={NCSULogoPath}/></a>
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
            <p>This sample should show the model's sample output.</p>
          </div>
          {/*Able to read the public folder within the project*/}
          <img src={process.env.PUBLIC_URL + '/free-tomato-image.avif'} id="sampleImage" alt="Example image" />
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
        <img src={image} id="resultImage" alt="Example image"/>
        
      </div>
    </div>
  );
}

export default App;
