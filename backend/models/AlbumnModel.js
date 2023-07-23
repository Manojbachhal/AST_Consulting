const mongoose = require("mongoose");

const Albumschema = mongoose.Schema({
  userid: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  albums: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        images: {
          type: [String], // Array of image URLs
          default: [],
        },
      },
    ],
    default: [],
  },
});
const AlbumModel = mongoose.model("Album", Albumschema);
module.exports = AlbumModel;
