const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user')

require('dotenv').config();
//Enable cors
app.use(cors());
app.set('view engine', "ejs");
app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({limit: '2mb', extended: false}));

app.use('/api/user', userRoutes)

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB Database");
  })
  .catch((e) => console.log(e));
  console.log("Connecting to MongoDB...");

require("./models/imageDetails");

const Images = mongoose.model("ImageDetails");


app.post("/upload-image", async(req, res) => {
  const {base64}=req.body;
  try {
    await Images.create({base64image:base64, type: "Image"});
    res.send({Status:"OK"})

  } catch (error) {
    res.send({Status:"ERROR", data:error});

  }
})

app.get("/get-image", async(req, res) => {
  
  const query = { type : "Image"};

  try {
    await Images.find(query).then(data => {
      res.send({status: "OK", data: data});
    })
  }
  catch (error) {
    console.log(error);
  }
})


app.delete("/remove-images", async(req, res) => {
  
  const query = { type : "Image"};

  try {
    const result = await Images.deleteMany(query);
    console.log("Deleted " + result.deletedCount + " documents");
    res.send({Status:"OK"})
  }
  catch (error) {
    console.log(error);
  }  

})


app.listen(port, () => {
  console.log(`Application is open on http://localhost:${port}`);
});
