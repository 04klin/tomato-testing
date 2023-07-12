const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
app.use(express.json());
app.set('view engine', "ejs");
app.use(express.urlencoded({extended: false}));

const jwt = require('jsonwebtoken');

const mongoURL = "";

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Database");
  })
  .catch((e) => console.log(e));

require("./imageDetails");

const Images=mongoose.model("ImageDetails");


app.post("/upload-image", async(req, res) => {
  const {base64}=req.body;
  try {
    Images.create({base64image:base64});
    res.send({Status:"OK"})

  } catch (error) {
    res.send({Status:"error", data:error});

  }
})



app.get("/", (req, res) => {
  res.end('Here');
})

app.listen(port, () => {
  console.log(`Application is open on http://localhost:${port}`);
});