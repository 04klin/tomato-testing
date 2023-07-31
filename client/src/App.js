import React, { useState, useEffect } from "react";
import './App.css';

function App() {

  const NCSULogoPath ="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/North_Carolina_State_University_Athletic_logo.svg/800px-North_Carolina_State_University_Athletic_logo.svg.png";
  
  const [image, setImage] = useState(null);
  const [base64image, setBase64Image] = useState("");
  const [allImage, setAllImage] = useState([]);


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

  useEffect(() => {
    getImage();
    document.title = "Tomato";
  }, [])

  function uploadImageToMongo(event) {
    event.preventDefault();
    fetch("https://tomatomodel-msh0.onrender.com/upload-image", {
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
    .then(() => {
      console.log(`Image has been saved`);
      //Resets the preview image
      setImage('');
      getImage();
      })
    .then((data) => console.log(data))
  }

  function getImage() {
    fetch("https://tomatomodel-msh0.onrender.com/get-image", {
      method: "GET"
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setAllImage(data.data);
    })
    .catch(error => console.log(error))
  }
  
  return (
    <div>
      <nav className="navbar sticky-top">
        <div className="container flex">
          <a href="/"><img width="40" length="auto" src={NCSULogoPath} alt="NCSU Logo"/></a>
          <ul className="nav justify-content-end">
            <li><a className="navlink" href="about.html">About</a></li>
            <li><a className="navlink" href="contact.html">Contact</a></li>
          </ul>
        </div>
      </nav>

      <div className="example">
        <div className="container flex">
          <div>
            <h4>Sample</h4>
            <p>This sample should show the model's sample output.</p>
          </div>
          {/*Able to read the public folder within the project*/}
          <img src={process.env.PUBLIC_URL + '/free-tomato-image.avif'} id="sampleImage" alt="Example" />
        </div>
      </div>      

      <div className="container section-detector-prompt">
        <h1 className="header">Disease Detector</h1>
        <p>Upload a picture of the desired tomato crops below</p>
        <p>You can do so by clicking browse or dragging and dropping</p>

        <h3>
          The backend server sometimes needs time to spin up.          
        </h3>
        <h3>
          Please wait until you see pictures below before uploading images.
        </h3>

        <br />        
      </div>
      
      <form onSubmit={uploadImageToMongo}>
          <button type="submit" id="submitButton">Upload Image</button>
          <div className="alignLeft">
            <input accept ="image/*" type="file" onChange={ImageUpload}/>
          </div>
          <div>
            <img src={image} id="previewImage"/>
          </div>          
        </form>

      <div className="container flex">
        <h4 className="small-header">Result "not yet implemented"</h4>
      
       <br/>
        
        <div>
          {allImage.map(data => {
            return(
              <img width={192} height = {108} src={data.base64image} alt="mongoDB"/>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
