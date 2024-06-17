// import Router from express
const { Router } = require("express");
// import controller file
const authController = require("../controllers/authController");

// create a router instance
const router = Router();

router.get("/signup", authController.signup_get);
router.get("/login", authController.login_get);
router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
// router.get("/logout", () => {});

module.exports = router;
