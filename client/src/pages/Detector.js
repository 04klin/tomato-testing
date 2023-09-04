import React, { useState, useEffect } from "react";
import '../css/Home.css';
import {load, YOLO_V5_N_COCO_MODEL_CONFIG} from 'yolov5js'

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


const Detector = () => {

  const [image, setImage] = useState(null);

  //Model states
  const [model, setModel] = useState(null);
  const [status, setStatus] = useState(WAITING_FOR_IMAGE);

  useEffect(() => {
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

  const clear = (e) => {
    e.preventDefault();
    setImage(null);
    let canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  //Updates the state and displays image
  const detect = (event) => {
    if (event.target.files && event.target.files[0]) { 
      //The function below uses a url create object
      setImage(URL.createObjectURL(event.target.files[0]));

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

  return (
    <div>      
      <div className ="small-header">
        <h1>This detector has not been trained on tomatos yet.</h1>
          {model == null && "Model Loading ..."}
          {model != null && "Model Loaded"}
      </div>    

      <form>
        <button type="submit" id="submitButton" onClick={clear}>Clear Image</button>
        <div className="alignLeft">
          <input accept ="image/*" type="file" onChange={detect}/>
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
    </div>
  )
}

export default Detector;