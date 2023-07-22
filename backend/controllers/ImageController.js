const ImageModel = require("../models/imageModel");
const fs = require("fs");
const path = require("path");
const getSingleImage = (filename) => {
  const data = ImageModel.find({ image: filename });
  // console.log(image, likes);
};
const uploadImage = (filename, key, likes = 0) => {
  const myArray = key.split(",");
  console.log(myArray);
  const newImage = { image: filename, key: myArray, likes };
  ImageModel.create(newImage);
};

const getAllimages = async () => {
  try {
    // Reading the directory where the images are stored
    const imageFiles = await ImageModel.find();

    const imageUrls = imageFiles.map((file) => {
      return {
        _id: file.id,
        key: file.key,
        likes: file.likes,
        comment: file.comment,
        image: `http://localhost:5000/uploads/${file.image}`,
      };
    });

    // Send the image URLs as the response
    return imageUrls;
  } catch (error) {
    // console.error("Error fetching images:", error);
    return res.status(500).json({ error: "Failed to fetch images" });
  }
};

const updateLikes = async ({ _id, likes }) => {
  try {
    // Find the image by its ID
    const image = await ImageModel.findById(_id);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    // console.log(image);
    // Update the likes for the image
    image.likes = likes;
    await image.save();

    return { message: "Likes updated successfully" };
  } catch (error) {
    return error;
  }
};
const updateComment = async ({ _id, commentdata }) => {
  try {
    // Find the image by its ID
    const image = await ImageModel.findById(_id);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    image.comment = [...image.comment, commentdata];
    await image.save();

    return { message: "Likes updated successfully" };
  } catch (error) {
    return error;
  }
};

module.exports = {
  uploadImage,
  getAllimages,
  updateLikes,
  updateComment,
};
