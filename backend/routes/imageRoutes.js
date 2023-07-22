const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { uploadImage, getAllimages } = require("../controllers/ImageController");
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
  let imageUrls = await getAllimages();
  res.json({ images: imageUrls });
});

module.exports = router;
