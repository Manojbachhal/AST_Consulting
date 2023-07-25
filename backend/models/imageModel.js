const mongoose = require("mongoose");

const Imageschema = mongoose.Schema({
  image: String,
  likes: Number,
  key: {
    type: [String],
    default: [],
  },
  comment: {
    type: [
      {
        user: String,
        data: String,
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const ImageModel = mongoose.model("Images", Imageschema);
module.exports = ImageModel;
