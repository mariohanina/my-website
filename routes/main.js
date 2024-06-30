// Modules
const express = require("express");
const router = express.Router();

const mainController = require("../controllers/main")

// Render main page on get request, send email on post request
router.route("/")
    .get(mainController.renderMainPage)
    .post(mainController.submtContactForm)


module.exports = router;