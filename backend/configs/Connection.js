const moongose = require("mongoose");

const connection = moongose.connect(process.env.MONGO);

module.exports = { connection };
