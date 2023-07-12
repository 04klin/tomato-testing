const mongoose = require("mongoose");

const ImageDetailsSchema = new mongoose.Schema(
  {
    base64image: String
  },
  {
    collection: "ImageDetails",
  }
);

mongoose.model("ImageDetails", ImageDetailsSchema);