// Modules
const request = require("request");
const { StringStream } = require("scramjet");

// API key
const apiKey = process.env.API_KEY;

// The ticker symbol of the company the user chooses will be assigned to parcel later on
let parcel;

// Render Stocks Page
module.exports.renderStocksPage = (req, res) => { res.render("apps/stocks") };

// Request company list
module.exports.requestListingStatus = (req, res) => {
    let listOfCompanies = [];
    request.get(`https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${apiKey}`)
        .pipe(new StringStream())
        .CSVParse()
        .consume(object => listOfCompanies.push(object))
        .then(() => res.status(200).json({ options: listOfCompanies }))
        .catch((err) => {
            console.log("Backend err");
            res.send("Error")
        })
};

// Submit the ticker symbol of the company that was chosen
module.exports.submitChoice = (req, res) => {
    parcel = req.body;
    // Why do I need this code?
    if (!parcel) return res.status(400).send({ status: "failed" })
    res.status(200).send({ status: "recieved" })
};

// Get information about the company that was chosen
module.exports.getInformation = (req, res) => {
    request.get({
        // Clean up the url
        url: `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${parcel.parcel}&apikey=${apiKey}`,
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