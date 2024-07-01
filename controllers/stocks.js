// Modules
const request = require("request");
const { StringStream } = require("scramjet");

// API key
const apiKey = process.env.API_KEY;


// Render Stocks Page
module.exports.renderStocksPage = (req, res) => {
    res.locals.title = "Stocks App";
    res.render("apps/stocks")
};

// Request company list
module.exports.requestListingStatus = (req, res) => {
    const listOfCompanies = [];
    request.get(`https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${apiKey}`)
        .pipe(new StringStream())
        .CSVParse()
        .consume(object => listOfCompanies.push(object))
        .then(() => res.status(200).json({ options: listOfCompanies }))
        .catch((err) => {
            console.log("Backend err: ", err);
            res.send("Error")
        })
};

// Get information about the company that was chosen
module.exports.getInformation = (req, res) => {
    request.get({
        url: `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${req.params.tickerSymbol}&apikey=${apiKey}`,
        json: true,
        headers: { 'User-Agent': 'request' }

    }, (err, response, data) => {
        if (err) {
            console.log('Error location: (B-1). ', err);
            res.send("Error")
        } else if (response.statusCode !== 200) {
            console.log('Error location: (B-2). Status: ', response.statusCode);
            res.send("Error");
        } else {
            res.status(200).json({ information: data });
        }
    });
};