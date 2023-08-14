import React, { useState, useEffect } from "react";
import './Home.css';
import {load, YOLO_V5_N_COCO_MODEL_CONFIG} from 'yolov5js'
import { Link } from "react-router-dom";


const NCSULogoPath ="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/North_Carolina_State_University_Athletic_logo.svg/800px-North_Carolina_State_University_Athletic_logo.svg.png";

//Model fields credits to SkalskiP
const WAITING_FOR_IMAGE = 0
const IMAGE_LOADED = 1
const INFERENCE_COMPLETED = 2

const BOX_COLORS = ['#FF3838', '#FF9D97', '#FF701F', '#FFB21D', '#CFD231', '#48F90A', '#92CC17', '#3DDB86', '#1A9334',
    '#00D4BB', '#2C99A8', '#00C2FF', '#344593', '#6473FF', '#0018EC', '#8438FF', '#520085', '#CB38FF', '#FF95C8', '' +
    '#FF37C7']
const BOX_LINE_WIDTH = 2
const FONT_COLOR = '#FFFFFF'
const FONT_SIZE = 12
const FONT = FONT_SIZE + 'px sans-serif';


const Home = () => {


  const [image, setImage] = useState(null);
  const [base64image, setBase64Image] = useState("");
  const [allImage, setAllImage] = useState([]); 


  //Model states
  const [model, setModel] = useState(null);
  const [status, setStatus] = useState(WAITING_FOR_IMAGE);

  useEffect(() => {
    getImage();

    //Loads the coco model to be used
    load(YOLO_V5_N_COCO_MODEL_CONFIG)
            .then(model => {
                setModel(model)
                console.log('Model loaded :)')
            })
            .catch(error => {
                console.log('Model failed to loaded :(')
            })
    
  }, [])
  //Updates the state and displays image
  const onDrop = (event) => {
    if (event.target.files && event.target.files[0]) { 
      //The function below uses a url create object
      setImage(URL.createObjectURL(event.target.files[0]));
      //The function below uses base64 code to display image
      convertToBase64(event);

      setStatus(IMAGE_LOADED)
      loadImage(event.target.files[0]).then((image) => {
        onImageLoad(image)
        setStatus(INFERENCE_COMPLETED)
      })
    }
  }
  
  const loadImage = (fileData) => {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(fileData);
        const image = new Image();
        image.src = url;
        image.onload = () => resolve(image);
        image.onerror = reject;
    });
  }

  const getOriginalImageRect = (image) => {
    return [0, 0, image.naturalWidth, image.naturalHeight]
  }

  const getScaledImageRect = (image, canvas) => {
    const ratio = Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
    const scaledWidth = Math.round(image.naturalWidth * ratio);
    const scaledHeight = Math.round(image.naturalHeight * ratio);
    return [
        (canvas.width - scaledWidth) / 2,
        (canvas.height - scaledHeight) / 2,
        scaledWidth,
        scaledHeight
    ]
  }

  const drawImageOnCanvas = (image, ctx, originalImageRect, scaledImageRect) => {
    const [originalImageX, originalImageY, originalImageWidth, originalImageHeight] = originalImageRect
    const [scaledImageX, scaledImageY, scaledImageWidth, scaledImageHeight] = scaledImageRect
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(
        image,
        originalImageX,
        originalImageY,
        originalImageWidth,
        originalImageHeight,
        scaledImageX,
        scaledImageY,
        scaledImageWidth,
        scaledImageHeight,
    );
  };

  const onImageLoad = image => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = FONT;
    ctx.textBaseline = "top";

    const originalImageRect = getOriginalImageRect(image)
    const scaledImageRect = getScaledImageRect(image, canvas)

    drawImageOnCanvas(image, ctx, originalImageRect, scaledImageRect)

    // PREDICT <-
    model.detect(image).then((predictions) => {
        predictions.forEach(prediction => {
          //This sketches out all the bounding boxes for each prediction
            const x = (prediction.x / originalImageRect[2] * scaledImageRect[2]) + scaledImageRect[0]
            const y = (prediction.y / originalImageRect[3] * scaledImageRect[3]) + scaledImageRect[1]
            const width = prediction.width / originalImageRect[2] * scaledImageRect[2]
            const height = prediction.height / originalImageRect[2] * scaledImageRect[2]
            const label = prediction.class + ": " + prediction.score.toFixed(1)
            const boxColor = BOX_COLORS[prediction.classId % 20];
            ctx.strokeStyle = boxColor;
            ctx.lineWidth = BOX_LINE_WIDTH;
            ctx.strokeRect(x, y, width, height);
            const labelWidth = ctx.measureText(label).width
            ctx.fillStyle = boxColor;
            ctx.fillRect(x, y, labelWidth + 4, FONT_SIZE + 4);
            ctx.fillStyle = FONT_COLOR;
            ctx.fillText(label, x, y);
        });
    })
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
      setAllImage(data.data);
    })
    .catch(error => console.log(error))
  }
  
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
        <div className ="small-header">
          {model == null && "Model Loading ..."}
          {model != null && "Model Loaded"}
        </div>      
      </div>
      
      
      <form onSubmit={uploadImageToMongo}>
        <button type="submit" id="submitButton">Upload Image to MongoDB {"(2 MB File Limit)"}</button>
        <div className="alignLeft">
          <input accept ="image/*" type="file" onChange={onDrop}/>
        </div>
        <div>
          <img src={image} id="previewImage" alt="Click or Drag and Drop Here"/>
        </div>          
      </form>
      

      <div className="container">
        <div className ="small-header">
          {status === IMAGE_LOADED && "Detection in progress ..."}
        </div>
        
        <canvas id="canvas" width="640" height="640"/>
      </div>


      <div className ="small-header">
        {/* This may be a problem if there are no images in the DB */}
        {allImage.length === 0 && "Backend is spinning up ..."}
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

     <div className="footer">
     </div>
    </div>
  );
}


export default Home;