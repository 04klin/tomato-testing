const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
const cors = require('cors');

var corsOptions = {
  origin: "http://localhost:8000"
};

app.use(express.json());
app.set('view engine', "ejs");
app.use(express.urlencoded({extended: false}));




mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB Database");
  })
  .catch((e) => console.log(e));
  console.log("Connecting to MongoDB...");

require("./imageDetails");

const Images=mongoose.model("ImageDetails");


app.post("/upload-image", async(req, res) => {
  const {base64}=req.body;
  try {
    await Images.create({base64image:base64});
    res.send({Status:"OK"})

  } catch (error) {
    res.send({Status:"ERROR", data:error});

  }
})

app.get("/get-image", async(req, res) => {
  try {
    await Images.find({}).then(data => {
      res.send({status: "OK", data: data});
    })
  }
  catch (error) {
    console.log(error);
  }
})

app.listen(port, () => {
  console.log(`Application is open on http://localhost:${port}`);
});