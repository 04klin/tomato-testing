import React, { useState, useEffect } from "react";
import './Home.css';
import { Link } from "react-router-dom";


const Home = () => {


  const [image, setImage] = useState(null);
  const [base64image, setBase64Image] = useState("");
  const [allImage, setAllImage] = useState([]);
  

  const [backOnline, setBackOnline] = useState(false);

  useEffect(() => {
    getImage();     
  }, [])


  //Updates the state and displays image
  const onDrop = (event) => {
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
  function uploadImageToMongo(event) {
    event.preventDefault();
    //Prevents no data submits and duplicate submits.
    if(image != null){
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
        setImage(null);
        getImage();
        })
      .then((data) => console.log(data))
    }
  }
  function getImage() {
    fetch("https://tomatomodel-msh0.onrender.com/get-image", {
      method: "GET"
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setBackOnline(true);
      setAllImage(data.data);
    })
    .catch(error => console.log(error))
  }

  function removeImages() {
    fetch("https://tomatomodel-msh0.onrender.com/remove-images", {
      method: "DELETE"
    })
    .then((res) => res.json())
    .then(() => {
      setAllImage([]);
      console.log("Deleted");
    })
    .catch(error => console.log(error))
  }
  
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

      <div className="example">
        <div className="container flex">
          <div className="leftHero">
            <h4>Example</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Quod aliquid nobis voluptatibus. Non culpa porro illum 
              repellendus nesciunt quia expedita?</p>
          </div>
          {/*Able to read the public folder within the project*/}
          <div className="rightHero">
            <img src={process.env.PUBLIC_URL + '/free-tomato-image.avif'} id="sampleImage" alt="Example" />
          </div>          
        </div>
      </div>      

      <div className="container section-detector-prompt">
        <h1 className="header">Disease Detector</h1>
        <h3>
          The backend server sometimes needs time to spin up.          
        </h3>
        <h3>
          Please wait until you see pictures below before uploading to MongoDB.
        </h3>          
      </div>
      
      <br />
      
      <form onSubmit={uploadImageToMongo}>
        <button type="submit" id="submitButton">Upload Image to MongoDB {"(2 MB File Limit)"}</button>
        <div className="alignLeft">
          <input accept ="image/*" type="file" onChange={onDrop}/>
        </div>
        <div>
          <img src={image} id="previewImage" alt="Click or Drag and Drop Here"/>
        </div>
      </form>


      <div className ="small-header">
        {/* This may be a problem if there are no images in the DB */}
        {(allImage.length === 0 && backOnline === false )&& "Backend is Offline and Spinning Up"}
        {(allImage.length === 0 && backOnline === true )&& "No Images In Server"}
      </div>

      <div className="container flexWrap gap">
        {allImage !== [] && 
          allImage.map(data => {
            return(
              <img width={192} height = {108} src={data.base64image} alt="mongoDB"/>
            )
          })
        }
        
      </div>

      <div className ="small-header">
        {allImage.length !== 0 && <button id="submitButton" onClick={removeImages}>Remove Images</button>}        
      </div>

     <div className="footer">
     </div>
    </div>
  );
}


export default Home;