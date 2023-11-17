const express = require("express");
const Controller = require("../controllers/controller");
const authentication = require("../middleware/authentication");
// const authorization = require("../middleware/authorization");
const user = require("./user");
const category = require("./categories");
const AuthController = require("../controllers/authController");
const router = express.Router();

router.post("/");
router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-login", AuthController.googleLogin);
router.post("/github-login", AuthController.githubLogin);

router.use(authentication);
router.use("/users", user);
router.use("/categories", category);

module.exports = router;
