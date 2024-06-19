const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email for login
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }

  // incorrect password for login
  if (err.message === "incorrect password") {
    errors.password = "that password is incorrect";
  }

  // duplicate email sign up error code
  if (err.code === 11000) {
    errors.email = "that email is already in use";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // destructure properties
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// Create JWT token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  // this will return a token with a signature
  // { id } = payload
  // headers are automatically applied
  // process.env.JWT_SECRET = secret
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // takes a value in seconds
    expiresIn: maxAge,
  });
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  // try to create a new user based on req.body
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    // send it back to user in json format
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    // this will store the user because .login returns the user
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  // remove token value
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
