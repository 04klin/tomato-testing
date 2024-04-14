import React, { useState, useEffect } from "react";
import { useSoftUIController } from "context/index";


const Examples = () => {

  const [image, setImage] = useState(null);
  const [base64image, setBase64Image] = useState("");
  const [allImage, setAllImage] = useState([]);
  

  const [backOnline, setBackOnline] = useState(false);


  const { user } = useSoftUIController();


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
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    .then((res) => res.json())
    .then(() => {
      getImage();
      console.log("Deleted");
    })
    .catch(error => console.log(error))
  }
  
  return (
    <div>
      <div className="container section-detector-prompt">
        <h1 className="header">Disease Detector</h1>
        <h3>
          The backend server sometimes needs time to spin up.
        </h3>
        <h3>
          Please wait until you see pictures below before uploading to MongoDB.
        </h3>
      </div>
      
      <form onSubmit={uploadImageToMongo}>
        {(backOnline === false )&& <button type="button" id="submitButton">Please Wait ...</button>}
        {(backOnline === true )&& <button type="submit" id="submitButton">Upload Image to MongoDB {"(2 MB File Limit)"}</button>}

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
        {allImage.length !== 0 &&
          allImage.map((data, index) => {
            return(
              <img key={index} width={192} height = {108} src={data.base64image} alt="mongoDB"/>
            )
          })
        }
      </div>

      <div className ="small-header">
        {(allImage.length !== 0 && user) && <button id="submitButton" onClick={removeImages}>Remove Images</button>}        
      </div>
    </div>
  );
}

export default Examples;