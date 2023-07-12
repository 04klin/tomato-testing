import React, { useState } from "react";
import './App.css';

function App() {

  const NCSULogoPath ="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/North_Carolina_State_University_Athletic_logo.svg/800px-North_Carolina_State_University_Athletic_logo.svg.png";
  
  const [image, setImage] = useState(null);
  const [base64image, setBase64Image] = useState("");

  //Updates the state and displays image
  const ImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {      
      //The function below uses a url create object
      setImage(URL.createObjectURL(event.target.files[0]));
      //The function below uses base64 code to display image
      convertToBase64(event);
    }
  }

  function convertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setBase64Image(reader.result);
    }
    reader.onerror = error => {
      console.log("Error: ", error);
    }
  }

  function uploadImageToMongo() {
    fetch("http://localhost:8000/upload-image", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        base64:base64image
      })    
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
  }
  //10:39
  return (
    <div>
      <nav class="navbar sticky-top">
        <div class="container flex">
          <a href="/"><img width="40" length="auto" src={NCSULogoPath} alt="NCSU Logo"/></a>
          <ul class="nav justify-content-end">
            <li><a class="navlink" href="about.html">About</a></li>
            <li><a class="navlink" href="contact.html">Contact</a></li>
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
          <img src={process.env.PUBLIC_URL + '/free-tomato-image.avif'} id="sampleImage" alt="Example" />
        </div>
      </div>      

      <div class="container section-detector-prompt">
        <h1 class="header">Detector</h1>
        <p>Upload a picture of the desired tomato crops below</p>
        
        <form>
          <input accept ="image/*" type="file" onChange={ImageUpload}/>
          <button onClick={uploadImageToMongo}>Upload</button>  
        </form>
        
        
    
        <h4 class="small-header">Your results will be shown below</h4>
      </div>
      <div class="container flex">
        <img src={image} id="resultImage" alt="Example"/>
        
      </div>
      <br/>
      <br/>
      <br/>
    </div>
  );
}

export default App;
