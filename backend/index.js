require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./configs/Connection");
const imageRoutes = require("./routes/imageRoutes");
const loginRoutes = require("./routes/LoginRoutes");

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.send(`<h1>Backend Working Properly</h1>`);
});
app.use("/image", imageRoutes);
app.use("/user", loginRoutes);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Server is running on ${process.env.PORT}`);
  } catch (error) {
    // console.log("Error while Connecting");
    console.log(error);
  }
});
