const ImageModel = require("../models/imageModel");

const getSingleImage = (filename) => {
  const data = ImageModel.find({ image: filename });
  console.log(image, likes);
};
const uploadImage = (filename, likes = 0) => {
  ImageModel.create({ image: filename, likes });
};

module.exports = {
  uploadImage,
};
