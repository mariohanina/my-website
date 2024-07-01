// If app is not deployed yet, require dotenv
if (process.env.NODE_ENV !== "production") require("dotenv").config();


// Modules
const express = require('express');
const ejsMate = require("ejs-mate");


// Express and port set up
const app = express();
const port = process.env.PORT || 3000;


// Middleware
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);


// Needed for parsing req.body
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routers
const mainRouter = require("./routes/main");
const hobbiesRouter = require("./routes/hobbies");
const stocksRouter = require("./routes/stocks");
const flashcardsRouter = require("./routes/flashcards");


// Routes
app.use("/", mainRouter)
app.use("/hobbies", hobbiesRouter);
app.use("/stocks-app", stocksRouter);
app.use("/flashcards-app", flashcardsRouter);


// Start the server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})