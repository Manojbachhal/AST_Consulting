const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { uploadImage } = require("../controllers/ImageController");
const PORT = 5000;
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post("/upload", upload.single("file"), (req, res) => {
  try {
    let result = uploadImage(req.file.filename);
    res.send(result);
  } catch (error) {
    res.send("Error while uploading");
  }
});

router.get("/allimages", async (req, res) => {
  try {
    // Reading the directory where the images are stored
    const imageFolder = "public/uploads";

    // Reading the file names in the image folder
    fs.readdir(imageFolder, (err, files) => {
      if (err) {
        console.error("Error reading the image folder:", err);
        return res.status(500).json({ error: "Failed to fetch images" });
      }

      const imageFiles = files.filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".gif", ".bmp"].includes(ext);
      });

      // Create an array to store image URLs
      const imageUrls = imageFiles.map((file) => {
        return `http://localhost:${PORT}/uploads/${file}`;
      });

      // Send the image URLs as the response
      return res.json({ images: imageUrls });
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    return res.status(500).json({ error: "Failed to fetch images" });
  }
});

module.exports = router;
