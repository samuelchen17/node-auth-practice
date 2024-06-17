const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// start an express app
const app = express();

// middleware, use static middleware for CSS and images
app.use(express.static("public"));

// view engine, register the view engine
app.set("view engine", "ejs");

// database connection
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("App connected to database");
    app.listen(3000, () => {
      console.log(`App is listening to port: 3000`);
    });
  })
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
