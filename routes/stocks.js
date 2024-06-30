const express = require("express");
const router = express.Router();

const stocksController = require("../controllers/stocks");

// Render the main stocks page
router.get("/", stocksController.renderStocksPage);
// Request a list of all available companies 
router.get("/list", stocksController.requestListingStatus);
// Submit the company that you chose
router.post("/choice", stocksController.submitChoice);
// Obtain information about the company you chose 
router.get("/information", stocksController.getInformation);

module.exports = router;