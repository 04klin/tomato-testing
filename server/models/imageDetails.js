const mongoose = require("mongoose");

const ImageDetailsSchema = new mongoose.Schema(
  {
    base64image: String,
    type: String,
  },
  {
    collection: "ImageDetails",
  }
);

mongoose.model("ImageDetails", ImageDetailsSchema);