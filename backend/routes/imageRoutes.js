const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const {
  uploadImage,
  getAllimages,
  updateLikes,
  updateComment,
  createAlbum,
} = require("../controllers/ImageController");
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
    let result = uploadImage(req.file.filename, req.body.keys);
    res.send(result);
  } catch (error) {
    res.send("Error while uploading");
  }
});

router.get("/allimages", async (req, res) => {
  try {
    let imageUrls = await getAllimages();
    res.send(imageUrls);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch images" });
  }
});

router.post("/updateLike", async (req, res) => {
  const { _id, likes } = req.body;
  try {
    let result = await updateLikes({ _id, likes });
    res.json({ message: "Likes updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update likes" });
  }
  // console.log("call");
});

router.post("/addcomment", async (req, res) => {
  const { _id, commentdata } = req.body;
  try {
    let result = await updateComment({ _id, commentdata });
    res.json({ message: "comment updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update likes" });
  }
  // console.log("call");
});

router.post("/createalbum", async (req, res) => {
  const { albumName, imageUrl } = req.body;
  try {
    let result = await createAlbum(albumName, imageUrl);
    console.log(result);
    res.send({ message: result.message });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create the album" });
  }
});

module.exports = router;
