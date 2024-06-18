const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter an password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

// hash password
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// the `user` here is important, must match the data base "users"
const User = mongoose.model("user", userSchema);

module.exports = User;

// // fire a function after doc saved to db
// // note: this is not a post request, this is post as in after
// // after "save" execute the function
// userSchema.post("save", function (doc, next) {
//   console.log("new user was created and saved", doc);

//   // next has to be called at the end of every mongoose hook or middleware
//   next();
// });

// // fire function before doc saved to db
// userSchema.pre("save", function (next) {
//   // using a normal function here so "this" can be used
//   // this refers to the user instance locally before it is saved to the db
//   console.log("user about to be created and saved", this);
//   next();
// });
