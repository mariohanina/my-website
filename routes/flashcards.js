// Modules
const express = require("express");
const router = express.Router();

const flashcardsController = require("../controllers/flashcards");

// Render the Flashcards main page
router.get("/", flashcardsController.renderFlashcardsApp);
// Launch the quiz
router.get("/:category", flashcardsController.renderFlashcardsQuiz);

module.exports = router;