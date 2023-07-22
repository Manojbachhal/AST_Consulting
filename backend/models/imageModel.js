const mongoose = require("mongoose");

const Imageschema = mongoose.Schema({
  image: String,
  likes: Number,
});
const ImageModel = mongoose.model("Images", Imageschema);
module.exports = ImageModel;
