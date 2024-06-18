const User = require("../models/userModel");

// handle erros
const handleErrors = (err) => {
  // console.log(err.message, err.code);
  let errors = { email: "", password: "" };
  console.log(err);
  // validation errors
  if (err.message.includes("user validation failed")) {
    // use object.values to grab the values from the erros object as an array
    // Object.values(err.errors).forEach((error) => {
    //   console.log(errors.properties);
    // });
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
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
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send("user login");
};
