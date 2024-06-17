const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

// the `user` here is important, must match the data base "users"
const User = mongoose.model("user", userSchema);

module.exports = User;
