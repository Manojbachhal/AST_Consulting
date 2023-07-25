const User = require("../models/User");
// const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async ({ name, email, password }) => {
  // console.log({ name, lastname, email, password, });
  let alreadyExist = await User.findOne({ email });

  if (alreadyExist) {
    throw new Error("Already Registered");
  }
  let user = await User.create({
    name,
    email,
    password,
  });
  user.toJSON();
  // console.log(delete user.password);
  delete user.password;
  return user;
};

const GenerateToken = (user) => {
  let payload = {
    _id: user.id,
    email: user.email,
    name: user.name,
  };
  // let token = jwt.sign(payload, "fsdfsdfsd");
  // console.log(token);
  return jwt.sign(payload, "kasndfksdn@-dsn");
};

const login = async ({ email, password }) => {
  let user = await User.findOne({ email });
  if (user) {
    user = user.toJSON();
    console.log(user);
    if (password === user.password) {
      delete user.password;
      return {
        token: GenerateToken(user),
      };
    }
  }
};

const loggedin = async (email) => {
  let user = await User.findOne({ email });
  // console.log(user);
  user = user.toJSON();
  delete user.password;
  return user;
};

function verifyTOken(token) {
  const payload = jwt.verify(token, "kasndfksdn@-dsn");
  return payload;
}

module.exports = {
  register,
  login,
  loggedin,
  verifyTOken,
};
