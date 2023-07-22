const mongoose = require("mongoose");

const connection = () => {
  return mongoose.connect(process.env.Mongo);
};

module.exports = { connection };
