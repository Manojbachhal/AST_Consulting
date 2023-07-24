const User = require("../models/User");
const bycrpt = require("bcryptjs");
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
    password: bycrpt.hashSync(password),
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

  return jwt.sign(payload, "kasndfksdn@-dsn");
};

const login = async ({ email, password }) => {
  let user = await User.findOne({ email });
  if (user) {
    user = user.toJSON();
    if (bycrpt.compareSync(password, user.password)) {
      delete user.password;
      console.log(user);
      return {
        token: GenerateToken(user),
        data: user,
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
