const ImageModel = require("../models/imageModel");
const fs = require("fs");
const path = require("path");
const Album = require("../models/AlbumnModel");
const { verifyTOken } = require("./LoginController");
const getSingleImage = (filename) => {
  const data = ImageModel.find({ image: filename });
  // console.log(image, likes);
};

const uploadImage = (filename, key, likes = 0) => {
  const myArray = key.split(",");
  // console.log(myArray);
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
const updateComment = async ({ _id, commentdata, token }) => {
  let user = verifyTOken(token);
  try {
    // Find the image by its ID
    const image = await ImageModel.findById(_id);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    image.comment = [...image.comment, { user: user.email, data: commentdata }];
    await image.save();

    return { message: "Comment updated successfully" };
  } catch (error) {
    return error;
  }
};

const createAlbum = async (albumName, imageUrl, token) => {
  let user = verifyTOken(token);
  // console.log(imageUrl);
  // console.log(user);
  try {
    // Check if an album with the same name already exists in the database
    const existingAlbum = await Album.findOne({
      "albums.name": albumName,
      userid: user.email,
    });

    if (existingAlbum) {
      // If the album exists, push the new image URL to the images array of the existing album
      existingAlbum.albums.forEach((album) => {
        if (album.name === albumName) {
          album.images.push(imageUrl);
        }
      });

      // Save the updated album with the new image URL to the database
      const updatedAlbum = await existingAlbum.save();
      // console.log("Image added to existing album:", updatedAlbum);
      return { message: "Image added to existing album:" };
    } else {
      // If the album does not exist, create a new album with the given name and the new image URL
      const newAlbum = new Album({
        userid: user.email, // Replace with the appropriate user ID
        albums: [
          {
            name: albumName,
            images: [imageUrl],
          },
        ],
      });

      // Save the new album to the database
      const savedAlbum = await newAlbum.save();
      // console.log("Album created with the new image:", savedAlbum);
      return { message: "Album created with the new image:" };
    }
  } catch (error) {
    console.error("Error while creating or updating the album:", error);
    return error;
  }
};

const getAlbum = async () => {
  const newAL = [];
  let res = await Album.find();
  for (let i = 0; i < res.length; i++) {
    let newAlbum = res[i].albums;
    for (let j = 0; j < newAlbum.length; j++) {
      newAL.push(newAlbum[j].name);
      // console.log(newAlbum[j].name);
    }
  }
  // console.log(newAL);
  return newAL;
};

module.exports = {
  uploadImage,
  getAllimages,
  updateLikes,
  updateComment,
  createAlbum,
  getAlbum,
};
