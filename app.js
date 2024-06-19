const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

// start an express app
const app = express();

// middleware, use static middleware for CSS and images
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

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
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);
