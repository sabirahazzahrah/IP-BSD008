const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.get("/", Controller.categories);
router.get("/:id", Controller.categoryById);
router.post("/:id", Controller.categoryById);

module.exports = router;
