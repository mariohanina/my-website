// Render the Flashcards main page
module.exports.renderFlashcardsApp = (req, res) => { res.render("apps/flashcards-main") };

// Launch the quiz
module.exports.renderFlashcardsQuiz = (req, res) => {
    res.render("apps/flashcards-quiz", { urlParam: req.params.category });
}