const express = require("express");
const router = express.Router();
const validation = require("./validation");

const userController = require("../controllers/userController");

// get signup form
router.get("/users/sign_up", userController.signUp);
// "sign up" button - creates user if credentials valid
router.post("/users", validation.validateUsers, userController.create);
// get sign in form
router.get("/users/sign_in", userController.signInForm);
// "sign in" button - signs user in if valid credentials
router.post("/users/sign_in", validation.validateUsers, userController.signIn);
// signs user out
router.get("/users/sign_out", userController.signOut);

module.exports = router;
