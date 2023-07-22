const ImageModel = require("../models/imageModel");

const getSingleImage = (filename) => {
  const data = ImageModel.find({ image: filename });
  console.log(image, likes);
};
const uploadImage = (filename, likes = 0) => {
  ImageModel.create({ image: filename, likes });
};

const getAllimages = () => {
  try {
    // Reading the directory where the images are stored
    const imageFolder = "public/uploads";

    // Reading the file names in the image folder
    fs.readdir(imageFolder, (err, files) => {
      if (err) {
        console.error("Error reading the image folder:", err);
        return res.status(500).json({ error: "Failed to fetch images" });
      }

      // const imageFiles = files.filter((file) => {
      //   const ext = path.extname(file).toLowerCase();
      //   return [".jpg", ".jpeg", ".png", ".gif", ".bmp"].includes(ext);
      // });

      // Create an array to store image URLs
      const Imagedata = ImageModel.find({});
      const imageUrls = Imagedata.map((ele) => {
        return {
          ...ele,
          image: `https://splendid-getup-goat.cyclic.app/uploads/${ele.image}`,
        };
      });
      // const imageUrls = imageFiles.map((file) => {
      //   return `https://splendid-getup-goat.cyclic.app/uploads/${file}`;
      // });

      // Send the image URLs as the response
      return imageUrls;
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    return res.status(500).json({ error: "Failed to fetch images" });
  }
};

module.exports = {
  uploadImage,
  getAllimages,
};
